/* To update a "mock database" user, we need to import the Auth0 Management API node client. */
const ManagementClient = require('auth0').ManagementClient

/* Adding an Action name here so we can tell that the console.log message is coming from this Action. */
let i = 1
const ActionNickname = `[AUTH0 PRIVATE BETA]`

/* This function is executed after the user is successfully authenticated.  */
exports.onExecutePostLogin = async (event, api) => {

    /* Ensure all secret variables are configured */
    const requiredSecrets = [`FORM_ID`, `DOMAIN`, `M2M_CLIENT_ID`, `M2M_CLIENT_SECRET`, `MOCKDATABASE_USER_ID`]
    for (const secret of requiredSecrets) {
        if (event.secrets[secret] === undefined) {
            const secretErrorMsg = `The ${secret} secret variable is not defined!`
            console.log(secretErrorMsg)
            api.access.deny(secretErrorMsg)
            return
        }
    }

    /* Rendering a FORM right after the user authenticates. 
    In production, you'll likely add a condition, such as 
    "only render a FORM if the user authenticates in the context of the specific application". 
    For this lab, we will render a FORM for any application. */

    // if (event.client.name == `PRIVATE BETA`) {
    if (!event.user.app_metadata.isPrivateBetaUser) {
        console.log(`${ActionNickname} ${i++} | Redirecting the user to complete the "${event.secrets.FORM_ID}" FORM.`)
        api.prompt.render(event.secrets.FORM_ID)
    } else {
        console.log(`${ActionNickname} ${i++} | This user is already a verified PRIVATE BETA user.`)
    }
    // }

}

/* This function runs after the user completes the FORM, e.g., 
it provides the correct invitation code. */
exports.onContinuePostLogin = async (event, api) => {

    /* Here, we a variables to get the INVITATION_CODE the user has used. 
    Once the FORM is completed, the value should be returned. */
    const { INVITATION_CODE } = event.prompt.fields

    if (INVITATION_CODE) {

        console.log(`${ActionNickname} ${i++} | A user submitted an invitation code: "${INVITATION_CODE}".`)

        /* Since the invite code was verified during the FORM execution flow, 
        we are adding the marker to the user's "app_metadata" so this Action doesn't 
        redirect this user to the FORM next time. */
        api.user.setAppMetadata("isPrivateBetaUser", true)

        /* Since we are using the "app_metadata" field in our "mock database" user, we need to initialize 
        the Auth0 Management API Client and then use the "Update a User" endpoint to set the updated 
        "app_metadata" object, where the used invite code is removed from the array of invite codes. */
        console.log(`${ActionNickname} ${i++} | Let's remove the used code from the array of codes.`)
        const auth0ManagementAPI = new ManagementClient({
            domain: event.secrets.DOMAIN,
            clientId: event.secrets.M2M_CLIENT_ID,
            clientSecret: event.secrets.M2M_CLIENT_SECRET
        })

        /* Now we need to fetch our MockDatabase to get a list of invitations available */
        const fetchMockDatabase = await auth0ManagementAPI.users.get({ id: event.secrets.MOCKDATABASE_USER_ID })
        const INVITATION_LIST = fetchMockDatabase.app_metadata.invitation_codes

        /* We want to remove the used invitation code from the database now */
        const UPDATED_INVITATION_LIST = INVITATION_LIST.filter(item => item !== INVITATION_CODE)
        console.log(`${ActionNickname} ${i++} | Updated invitations list:\n${JSON.stringify(UPDATED_INVITATION_LIST, null, 2)}`)
        auth0ManagementAPI.users.update(
            { "id": event.secrets.MOCKDATABASE_USER_ID },
            { "app_metadata": { "invitation_codes": UPDATED_INVITATION_LIST } }
        )

        console.log(`${ActionNickname} ${i++} | Completed`)

    } else {

        api.access.deny(`${ActionNickname} ${i++} | The INVITATION_CODE wasn't returned from the Auth0 Form!`)

    }

}
/* End of script.  */
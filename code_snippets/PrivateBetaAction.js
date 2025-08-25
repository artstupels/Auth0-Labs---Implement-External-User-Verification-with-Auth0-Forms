/* Adding an Action name here so we can tell that the console.log message is coming from this Action when debugging using the Action Logs */
let i = 1
const ActionNickname = `[AUTH0 PRIVATE BETA]`

/* Since we don't have an actual database, we are going to send the list of the invitation codes
that our Form should accept when the user submits their invitation code. */
const INVITATION_LIST = ["A0-1234567", "A0-2345678", "A0-3456789", "A0-4567890", "A0-5678901"]

/* This function is executed after the user is successfully authenticated.  */
exports.onExecutePostLogin = async (event, api) => {

    /* Ensure all secret variables are configured */
    const requiredSecrets = [`FORM_ID`]
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
        /* In this method we render a form by it's ID and also sending the INVITATION_LIST shared variable */
        api.prompt.render(event.secrets.FORM_ID, {
          vars: {
            INVITATION_LIST
          }
        })
    } else {
        console.log(`${ActionNickname} ${i++} | This user is already a verified PRIVATE BETA user.`)
    }
    // }

}

/* This function runs after the user completes the FORM, e.g., when submits the correct invitation code. */
exports.onContinuePostLogin = async (event, api) => {

    /* Here, we define the INVITATION_CODE variabl that the use has submitted in the Auth0 Form. 
    Once the FORM is completed, the value should be returned. */
    const { INVITATION_CODE } = event.prompt.fields

    if (INVITATION_CODE) {

        console.log(`${ActionNickname} ${i++} | A user submitted an invitation code: "${INVITATION_CODE}".`)

        /* Since the invitation code was verified during the FORM execution flow, 
        we are adding the marker to the user's "app_metadata" so this Action doesn't 
        redirect this user to the FORM next time. */
        api.user.setAppMetadata("isPrivateBetaUser", true)
        console.log(`${ActionNickname} ${i++} | Completed`)

    } else {

        api.access.deny(`${ActionNickname} ${i++} | The INVITATION_CODE wasn't returned from the Auth0 Form!`)

    }

}
/* End of script.  */
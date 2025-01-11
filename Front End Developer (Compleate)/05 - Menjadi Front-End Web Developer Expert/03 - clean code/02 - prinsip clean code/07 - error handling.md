bad => 
    ```
    try {
        sendMail();
    } catch (error) {
        console.log(error);
    }
    ```
good => 
    ```
    try {
        sendMail();
    } catch (error) {
        console.error(error);
        notifyUserOfError(error);
        reportErrorToService(error);
    }
    ```
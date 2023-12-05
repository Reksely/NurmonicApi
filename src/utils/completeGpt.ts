import GeekGpt, { Message } from "../providers/geekGpt"


export async function runGeek(messages: any[]): Promise<string> {
  try {
    const messages22: Message[] = messages;

    const response = await GeekGpt.createCompletion("gpt-3.5-turbo", messages22);


    return response;

  } catch (error) {
    //console.log(error.message)
    //console.error(error);
    return String(error);
  }
}

export async function completeGpt(data: any): Promise<any> {
  const MAX_RETRIES = 20;
  let retryCount = 0;
  let responseMessage = null

  while (retryCount < MAX_RETRIES) {
    try {
       responseMessage = await runGeek(data.messages);
      if (
        retryCount == 99
        /*responseMessage.toLowerCase().includes("fail") ||
        responseMessage.toLowerCase().includes("recaptcha") ||
        responseMessage.toLowerCase().includes("error") ||
        responseMessage.toLowerCase().includes("aborted")*/
      ) {
       // console.log(error.message)
        //console.log(responseMessage.choices[0])
        console.log('Error in response. Retrying for ' + retryCount + " time");
        retryCount += 1;
        await new Promise(resolve => setTimeout(resolve, 1000));  // Wait for a moment before retrying
      } else {
        break;  // Break out of the loop if a valid response is received
      }

    } catch (error) {
      //console.error(`Error in asynchronous call: ${error}`);
      console.log(error)
      console.log('Error in call. Retrying for ' + retryCount + " time");

      retryCount += 1;
      await new Promise(resolve => setTimeout(resolve, 1000));  // Wait for a moment before retrying
    }
  }

  if (retryCount === MAX_RETRIES) {
    console.log('Reached the maximum number of retries. Returning an error response.');
    return { error: "Maximum number of retries reached" };
  }

  // Return the response in the desired format
  return { response: responseMessage };
}
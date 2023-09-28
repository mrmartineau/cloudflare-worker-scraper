import { getErrorMessage } from './get-error-message'

const generateJSONResponse = (obj: any) => {
  return new Response(JSON.stringify(obj), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

const generateErrorJSONResponse = (error: unknown) => {
  const errorMessage = getErrorMessage(error)
  return generateJSONResponse({
    error: errorMessage,
  })
}

export { generateJSONResponse, generateErrorJSONResponse }

exports.formatBody = (event) => {
  let source = event.Records ? "sns || sqs" : "http";
  let body = event.Records ? event.Records[0] : event.body;

  try {
    if(typeof body === 'string') body = JSON.parse(body);
  } catch (err) {
    console.log("Error: unable to parse body to JSON", err);
  }
  return { source, body };
};

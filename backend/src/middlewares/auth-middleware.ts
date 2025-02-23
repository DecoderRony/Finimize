import { NextFunction, Request, Response } from "express";
import { apps, credential, auth } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

// Initialize Firebase Admin SDK (Only do this once)
if (!apps.length) {
  initializeApp({
    credential: credential.cert({
      projectId: "expense-tracker-9fa0f",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCLpzVcesdeGK76\n5QeNLHMFbKAOUhda/R2Z5HHfEpAgFH0xpP00pQYHnEDLYHjEMVTDZGx8FrXCm/wk\nig22tCw/cCT6VjWnetH4IQvcCJSRfpd3OcwdoP7Vd+ByyPTmFbd/AEiaaRxKwvTJ\nj86prsfhN6+aHkU0uRdf5nJaog7yYjE0RoFTV79n4dwHmmRxK/2Y0v9yW0Aa8k4L\nWe2p/lsktwgJVIgMvzunaTWGDsnhmVaFhDmP8AfX4XY1dR1ChAg9AnNnvUvsFo7L\nVTD0xSw3sVDP7UuG4+BdnG1bNcT18XAXIruSNCQNStul9kQdvEX0qk7RZOMBnnLU\nEfHlILs1AgMBAAECggEACRhhfw2nBN+WK9R1PrJFpnWJ4gziJQSlpCNu8CCRHum+\nsphEfmR+BUpdpPE6RErTMquMbjN7cHqAvC96j6rh09rdqakqMudqm96pG1I6vNQS\nEMuEmexllGkLhuZEHuUMr5qI3/eXBl52m1cAlmgB8A7UorS0fKfOWCpVycXSs+Ht\nHvI4kZ5k5fcdUbLq8959dN8Z769znFJpJq0oaT2bLkxCzWXVB+2CMF9r/c7KDiY4\naYckcH/O1A57TZrxrRi2CFATQtrmtsI5C1+J3/y4IdyEyfFICvkLgprAmWfRhhUq\nWnKoh+tRhckhBYVtUGg9FjU4jP6beWKvAeXbAIYsuQKBgQDDAMofpcdbQ86topFY\nefGil2Kzc+maX6OMicFrPUz/6dbpBXqIJvMFht2Jmihvu+Vq5XnLrV2czCt9KLz4\nVi2CNdAXDf26QUshWh4FyDcBRKr07UuxMdOvMpHbPAj3ZQ1F5G40Lqh5udpkTQS7\n87pR5fhJ8CJ5kBqs8kNeLm5wqQKBgQC3Vi1vWPe3gN/tnWpKo+hFe160dTyQd9it\nI3jdr9Jk0TK8Bvoyac5scbBXUvg/q7i3BlgxPTLPGMRzbdakGoM6rf0FZusvBjCE\nTZGZpsjJ8gqIioE3O9oyt/VPu2CCD1fORn9FGAM8BUd7pE8AiMyeVmFdDJ0lJOno\nEIIBpSRxrQKBgAoAI12GIfgzPQk4mh2ge1zsSJqNakCJgRi3A91dEnLZajUfG86Z\nuMLizL++0S4Rw808oYdph7B/5AcSLMbLnJ/d5KMaC5YevRyjw4BmaTO+csoG1Wfr\n90A35rUImikd3JVmBqTUc71yY5nbPU/qSvbiRV59WzdCxaty7TOKTA2pAoGAB7OO\nCwxgs4utXGztZx9FhY2uJ8R4+9Sc/IDt9doJ64RCLlXYsr9xFWsdLj3lAb+z7bRN\nhhv9A2gV8IdfqdsXQiLG6zAslvgal6QuhpbT/m+1c5Dl5q0T+Gdz3ZqQbkY4uQiL\nFhrxH9dU7mOzkeEtP0V/p4n9G+9WCBKRc4I9aq0CgYEAg7kr/8vUPR7ojDu/pNkr\n0kPSM7faYN4khV4DM6ZogBuiNsh37VkgK+R9xuk6W2SmZo8N6i6Gu4qA8WD4teoZ\na28u6PPOMXK6eW/x50gjuEnN10Zpq85HyUeMThLeTQq/h7q+iriZpwwUOmfJjxnn\nkr7Fv/VsmvYzjBqFDdRzFYo=\n-----END PRIVATE KEY-----\n".replace(
          /\\n/g,
          "\n"
        ),
      clientEmail:
        "firebase-adminsdk-nlmeq@expense-tracker-9fa0f.iam.gserviceaccount.com",
    }),
  });
}

export interface RequestType extends Request {
  user?: {
    uid: string;
  };
}

const checkUserAuthenticationStatus = (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔴 If no token, return 401 Unauthorized
    if (!authHeader?.startsWith("Bearer ")) {
      return next(
        res.status(401).json({ message: "Unauthorized: No token provided" })
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    // Verify Firebase token
    auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        console.log("Authentication successful");
        req.user = {
          uid: decodedToken.uid,
        };
        next();
      });
  } catch (error) {
    console.error("Authentication error:", error);
    return next(
      res
        .status(401)
        .json({ message: "Unauthorized: Invalid or expired token" })
    );
  }
};

export default checkUserAuthenticationStatus;

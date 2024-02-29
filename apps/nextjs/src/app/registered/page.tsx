import React from "react";

import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

const SuccessPage: React.FC = () => {
  return (
    <div>
      <Alert>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your account on the Scouting App has been successfully created.
          <br />
          You will be assigned scouting roles & matches soon.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SuccessPage;

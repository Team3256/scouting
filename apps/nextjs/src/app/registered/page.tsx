import React from "react";

import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

const SuccessPage: React.FC = () => {
  return (
    <div>
      <Alert>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your account on "scouting-app" has been created successfully.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SuccessPage;

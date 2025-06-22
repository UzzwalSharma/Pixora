import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const Sandpackpreview = forwardRef((props, ref) => {
  const previewRef = useRef();
  const { sandpack } = useSandpack();

  useImperativeHandle(ref, () => ({
    getDeployUrl: async () => {
      try {
        const client = previewRef.current?.getClient();
        if (client) {
          console.log("Getting CodeSandbox client:", client);
          const result = await client.getCodeSandboxURL();
          console.log("CodeSandbox result:", result);
          
          if (result?.sandboxId) {
            const url = `https://${result.sandboxId}.csb.app/`;
            console.log("🌐 Generated Deploy URL:", url);
            return url;
          }
        }
        throw new Error("Failed to get CodeSandbox URL");
      } catch (error) {
        console.error("Error getting deploy URL:", error);
        throw error;
      }
    }
  }));

  return (
    <div className="h-full w-full">
      <SandpackPreview
        ref={previewRef}
        showNavigator={true}
        showRefreshButton={true}
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
        {...props}
      />
    </div>
  );
});

export default Sandpackpreview;
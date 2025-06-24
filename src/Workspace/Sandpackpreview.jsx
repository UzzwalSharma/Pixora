import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const Sandpackpreview = forwardRef((props, ref) => {
  const previewRef = useRef();
  const { sandpack } = useSandpack();

useImperativeHandle(ref, () => ({
  getDeployUrl: async () => {
    try {
      const clients = sandpack.clients;
      for (const clientId in clients) {
        const client = clients[clientId];
        if (client?.getCodeSandboxURL) {
          const result = await client.getCodeSandboxURL();
          if (result?.sandboxId) {
            const url = `https://${result.sandboxId}.csb.app/`;
            console.log("🌐 Matched Deploy URL:", url);
            return url;
          }
        }
      }
      throw new Error("No valid client with a sandboxId found");
    } catch (error) {
      console.error("Error getting deploy URL from clients:", error);
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
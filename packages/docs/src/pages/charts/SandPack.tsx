import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import { useEffect, useRef, useCallback } from "react";

function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): T {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  ) as T;

  return debouncedCallback;
}

function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack, dispatch } = useSandpack();
  const refresh = useDebounce(() => dispatch({ type: "refresh" }), 1000);

  const handleChange = (value: string | undefined) => {
    updateCode(value ?? "");
    if (sandpack.activeFile !== "/App.js") {
      refresh();
    }
  };

  const editorRef = useRef<any>();

  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current == null) return;
      editorRef.current.layout({});
      console.log(editorRef.current.layout);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SandpackStack style={{ margin: 0, height: "auto", minHeight: "50vh" }}>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 0, background: "#ffffff", minHeight: "300px" }}>
        <Editor
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-light"
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={handleChange}
          onMount={(editor) => {
            editorRef.current = editor;
            // 초기 레이아웃 설정
            editor.layout();
          }}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 8, bottom: 8 },
            automaticLayout: true, // 자동 레이아웃 조정 활성화
            wordWrap: "on" // 긴 줄 자동 줄바꿈
          }}
        />
      </div>
    </SandpackStack>
  );
}

const customSetup = {
  dependencies: {
    "@meursyphus/flitter-react": "0.0.8",
    "@meursyphus/flitter": "2.0.2",
    "react-dom": "^18.2.0",
    react: "^18.2.0",
    "react-markdown": "^9.0.1",
    "@meursyphus/flitter-chart": "0.0.9",
    "@meursyphus/headless-chart": "^0.0.4",
  },
};

export default function MySandpack({
  files,
}: Readonly<{
  files: Record<string, string>;
}>) {
  return (
    <SandpackProvider
      template="react"
      files={files}
      customSetup={customSetup}
      theme={{
        colors: {
          surface1: "#ffffff",
          surface2: "#EFEFEF",
        },
      }}
    >
      <SandpackLayout style={{ height: "auto", minHeight: "100vh" }}>
        <SandpackPreview style={{ height: "auto", minHeight: "50vh" }} />
        <MonacoEditor />
      </SandpackLayout>
    </SandpackProvider>
  );
}

type InteractionPromptProps = {
  action: string;
  control?: string;
  visible?: boolean;
};

function InteractionPrompt({
  action,
  control = "E",
  visible = true,
}: InteractionPromptProps) {
  if (!visible) return null;

  return (
    <div className="interaction-prompt" role="status">
      <kbd className="interaction-control">{control}</kbd>
      <span className="interaction-action">{action}</span>
    </div>
  );
}

export default InteractionPrompt;

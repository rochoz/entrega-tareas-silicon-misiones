function PasswordDisplay({ password, onCopiar, copiado }) {
  return (
    <div className="visor">
      <input
        type="text"
        value={password}
        placeholder="P4$5W0rD!"
        readOnly
      />
      <button onClick={onCopiar}>{copiado ? "¡Copiado!" : "📋"}</button>
    </div>
  );
}

export default PasswordDisplay;
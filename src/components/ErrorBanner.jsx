function ErrorBanner({ errorMessage, onClear }) {
 
  return (
    errorMessage && (
      <div style={{ backgroundColor: "red", color: "white", padding: "10px", borderRadius: "10px", }}>
        <strong>Error:</strong> {errorMessage}
        {onClear && (
          <button type="button" onClick={onClear}> Reset</button>
        )}
      </div>
    )
  )
}

export default ErrorBanner



const TypewriterEffect = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // TODO Display the text with typewriter effect
    const result = document.getElementById("result");
    result.innerHTML = "";
    const sentence = data.get("sentence");
    for (let i = 0; i < sentence.length; i++) {
      setTimeout(() => {
        result.innerHTML += sentence[i];
      }, 100 * i);
    }
    console.log(`The sentence to display is ${data.get("sentence")}`);
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            name="sentence"
            placeholder="Type a sentence"
            style={{ width: "300px" }}
          />
          <button type="submit">Display with typewriter effect</button>
        </form>
      </div>
      <p id="result"></p>
    </>
  );
};

export default TypewriterEffect;

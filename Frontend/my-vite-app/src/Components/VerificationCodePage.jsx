const VerificationCodePage = () => {
  return (
    <div>
      <h1>Verification Code Page</h1>
      <section>
        <label>Enter Verification Code: </label>
        <br />
        <input type="tel" maxlength="1" inputmode="numeric" />
        <input type="tel" maxlength="1" inputmode="numeric" />
        <input type="tel" maxlength="1" inputmode="numeric" />
        <input type="tel" maxlength="1" inputmode="numeric" />
        <input type="tel" maxlength="1" inputmode="numeric" />
        <br />
        <button>Verify</button>
      </section>
    </div>
  );
};

export default VerificationCodePage;

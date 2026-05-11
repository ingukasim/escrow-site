const handleRegister = async (e: any) => {
  e.preventDefault();

  setLoading(true);

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully!");

    window.location.href = "/login";
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};
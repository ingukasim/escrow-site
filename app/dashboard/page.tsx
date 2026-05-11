const loadOrders = async () => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } =
    await supabase
      .from("orders")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", {
        ascending: false,
      });

  if (!error && data) {
    setOrders(data);
  }

  setLoading(false);

};
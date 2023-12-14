const formatMonetary = (value) => {
  const formattedValue = Number(value) || 0;

  return formattedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export { formatMonetary };

export const getDayWithMostInvoices = (invoices) => {
    const counts = invoices.reduce((acc, { created_at }) => {
      const date = new Date(created_at);
      const day = date.getDate();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
  
    let maxDay = null;
    let maxCount = 0;
  
    Object.entries(counts).forEach(([day, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxDay = day;
      }
    });
  
    return { day: maxDay, count: maxCount };
  };
  
export const fetchData = async (res) => {
    debugger;
    try {
      const response = await fetch("https://randomuser.me/api");
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
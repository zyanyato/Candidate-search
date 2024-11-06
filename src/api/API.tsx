const searchGithub = async (searchTerm: string) => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log(import.meta.env.VITE_GITHUB_TOKEN); //C1
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    console.log('GitHub Token:', import.meta.env.VITE_GITHUB_TOKEN);
    // console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }

    const filteredData = data.filter((user: { login: string }) =>
      user.login.includes(searchTerm)
  );
    console.log('Filtered Data:', filteredData); //C3
    return filteredData;
  } catch (err) {
    // console.log('an error occurred', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    // console.log('an error occurred', err); 
    return {};
  }
};

export { searchGithub, searchGithubUser };

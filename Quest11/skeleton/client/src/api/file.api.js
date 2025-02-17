import { getJwtToken } from '../libs';
import { SERVER_URL } from '../libs/constants';

const getAll = async () => {
  try {
    const token = getJwtToken();

    if (!token) {
      console.log('나머지 기능은 jwt로 로그인하는걸로 구현되어있음');

      return { data: [] };
    }

    const response = await fetch(`${SERVER_URL}/file`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.error('getAll');
  }
};

const postFile = async ({ name, content }) => {
  const token = getJwtToken();

  const response = await fetch(`${SERVER_URL}/file`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
    body: JSON.stringify({ name, content }),
  });

  const result = await response.json();

  return result.data;
};

const deleteFile = async (name) => {
  const token = getJwtToken();

  const response = await fetch(`${SERVER_URL}/file`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
    body: JSON.stringify({ name }),
  });

  const data = await response.json();

  return data.ok;
};

export default {
  getAll,
  postFile,
  deleteFile,
};

import { fetchBackend } from '../utils';

class Me {
  async getMyProfile() {
    const [result, err] = await fetchBackend('get', '/api/me');
    if (err) {
      return [null, err];
    }
    const url = import.meta.env.VITE_API_URL;
    const { avatar } = result;
    const avatarSrc = url + avatar;
    return [
      {
        ...result,
        avatar: avatar ? avatarSrc : ''
      },
      null
    ];
  }

  getMyRecords() {
    return fetchBackend('get', '/api/me/records');
  }

  uplaodAvatar(formData: FormData) {
    return fetchBackend('post', '/api/me/avatar', {
      data: formData,
      headers: { 'Content-type': 'multipart/form-data' }
    });
  }
  async updateMyProfile() {}
}

const meService = new Me();

export default meService;

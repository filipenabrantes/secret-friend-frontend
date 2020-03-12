import { environment } from '../../../../environments/environment';

export const API = environment.API;

export class SecretFriendApi {
  public static getFriends = () => {
    return `${API}/`;
  }

  public static postNewFriend = () => {
    return `${API}/friends/new`;
  }

  public static putEditFriend = (id: string) => {
    return `${API}/friends/${id}`;
  }

  public static postDrawFriend = () => {
    return `${API}/friends/draw`;
  }

  public static deleteFriend = (id: string) => {
    return `${API}/friends/${id}`;
  }
}

import roles from '../../constants/roles.json';

class Role {
  roles: any;
  constructor() {
    this.roles = roles;
  }

  public async getRoleByName(name: string) {
    return this.roles.find((r) => r.name === name);
  }

  public async getRole() {
    return this.roles !== null ? this.roles : null;
  }
}

export class Permission {
  permission: Array<any>;
  constructor() {
    this.permission = [];
  }

  getPermissionByRoleName(roleName: string) {
    const role = roles.roles.find((r) => r.name === roleName);
    return role ? role.permissions : [];
  }
}

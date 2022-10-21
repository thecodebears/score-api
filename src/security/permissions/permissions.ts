import { SetMetadata } from "@nestjs/common";
import { PermissionsList } from "./permissions.types";

/*
 * Module-class for verifying permissions.
 */
export class Permissions {
    /*
     * Allowed permissions. 
     */
    public static list: PermissionsList = {};

    public static parsePermission(permission: string): string[] {
        return permission.split(/\./g);
    }

    public static formatPermission(permissionParts: string[]) {
        return permissionParts.join('.');
    }

    public static enlistPermissionsGroup(label: string, scopes: string[]) {
        this.list[label] = scopes;
    }

    public static validatePermissions(permissions: string[]) {
        let formattedEnlistedPermissions = Object
            .entries(this.list)
            .map(([ label, scopes ]) => scopes.map(
                scope => this.formatPermission([ label, scope ])).concat([ label ])
            )
            .reduce((a, b) => a.concat(b));

        return permissions.every(p => formattedEnlistedPermissions.includes(p));
    }

    /*
     * Checks if owned permission is satisfy to required.
     */
    public static satisfy(requiredPermission: string, ownedPermission: string): boolean {
        if (ownedPermission === '*') return true;

        let parsedRequiredPermission = this.parsePermission(requiredPermission);
        let parsedOwnedPermission = this.parsePermission(ownedPermission);

        for (let i = 0; i < parsedRequiredPermission.length; i++) {
            let requiredPermissionPart = parsedRequiredPermission[i];
            let ownedPermissionPart = parsedOwnedPermission[i];

            if (ownedPermissionPart && (requiredPermissionPart !== ownedPermissionPart)) return false;
            if (!ownedPermission) return true;
        }

        return true;
    }

    /*
     * Checks if all owned required permissions are included.
     */
    public static verify(requiredPermissions: string[], ownedPermissions: string[]): boolean {
        return requiredPermissions.every(rp => ownedPermissions.some(op => this.satisfy(rp, op)));
    }
}

export const SetPermissions = (...permissions: string[]) => {
    if (!Permissions.validatePermissions(permissions))
        throw new ReferenceError('Invalid permissions. Check if all specified permissions are enlisted.');
    return SetMetadata('PERMISSIONS', permissions);
}

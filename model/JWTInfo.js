module.exports = class JWTInfo {
    constructor(jwt) {
        this.jwt = jwt

        this.accountId = this.jwt.sub || null
        this.displayName = this.jwt.dn || null

        this.permissions = [
            {
                permission: "fortnite:cloudstorage:system",
                abilities: ["READ"]
            },
            {
                permission: "fortnite:cloudstorage:system:*",
                abilities: ["READ"]
            }
        ]

        if (jwt != "client_credentials") this.permissions = this.permissions.concat(this.permissions, [
            {
                permission: `friends:${this.jwt.sub}`,
                abilities: ["READ", "UPDATE", "DELETE"]
            },
        ])
    }

    //really just gonna use this for friends, doesn't help to add some others
    getPermissions() {return this.permissions}

    checkPermission(permission, type) {
        var perm = this.permissions.find(x => x.permission == permission)
        if (!perm) return false

        if (!perm.abilities.includes("type")) return true
        else return false
    }
}
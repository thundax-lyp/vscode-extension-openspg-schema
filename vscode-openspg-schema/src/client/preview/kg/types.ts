export class KGSchema {
    readonly namespace: KGNamespace | undefined;
    readonly entities: KGEntity[];

    public constructor(namespace: KGNamespace | undefined, entities: KGEntity[]) {
        this.namespace = namespace;
        this.entities = entities;
    }
}

export class KGNamespace {
    readonly value: string;

    public constructor(value: string) {
        this.value = value;
    }
}

export class KGEntity {
    id: string;
    name: string;
    aliasName: string;
    types: string[];
    properties: KGProperty[];

    public constructor(id: string, name: string, aliasName: string, types: string[], properties: KGProperty[] = []) {
        this.id = id;
        this.name = name;
        this.aliasName = aliasName;
        this.types = types;
        this.properties = properties;
    }
}

export class KGProperty {
    name: string;
    value: string | undefined;
    children: KGEntity[];

    public constructor(name: string, value: string | undefined, children: KGEntity[] = []) {
        this.name = name;
        this.value = value;
        this.children = children;
    }
}

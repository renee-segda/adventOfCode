export interface Directory {
    name: string,
    files: File[],
    children: Map<string, Directory>,
    parent?: Directory,
}

export interface File {
    name: string,
    size: number
}
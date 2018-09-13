interface IBind {
    getSocket(socketName: String, resultMatrix: Matrix3D): void;
    getSunType(): number;
}
interface IMulBind {
    getMulSocket(ary: Array<Vector3D>): void;
}

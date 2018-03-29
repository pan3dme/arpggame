declare namespace Zlib {
	export class Inflate {
		constructor(data?: Uint8Array);
		decompress(): Uint8Array;
	}
}
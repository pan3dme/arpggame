declare namespace Zlib {
	export class Inflate {
		constructor(data?: Uint8Array);
		decompress(): Uint8Array;
	}
}

declare class Base64 {
    encode(value: string): string;
} 

declare function hex_md5(value: string): string;

/**录音功能是否准备好 */
declare function getRecordReady():boolean;

/**开始录音 */
declare function startRecord():void;

/**结束录音 */
declare function stopRecord($fun:Function);

/**播放录音 */
declare function playRecord(sid:string);
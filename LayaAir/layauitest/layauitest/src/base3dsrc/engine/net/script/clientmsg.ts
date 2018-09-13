/***********************************************************************/
/*************** 本代码由协议工具自动生成，请勿手动修改 ****************/
/***********************************************************************/





class both_null_action
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onNull_action"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_null_action, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class both_ping_pong
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onPing_pong"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_ping_pong, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_forced_into
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onForced_into"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_forced_into, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_get_session
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onGet_session"; 
	private static input:ByteArray;		
	
	/**
	 * 
	 */
	public sessionkey :string ;	//String		
	/**
	 * 玩家id
	 */
	public account :string ;	//String		
	/**
	 * 版本
	 */
	public version :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_session, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//
		self.sessionkey = this.input. readString ();		
		
		//玩家id
		self.account = this.input. readString ();		
		
		//版本
		self.version = this.input. readString ();		
		
	}
}





class both_route_trace
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onRoute_trace"; 
	private static input:ByteArray;		
	
	/**
	 * 
	 */
	public val :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_route_trace, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//
		self.val = this.input. readString ();		
		
	}
}





class c2s_write_client_log
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onWrite_client_log"; 
	private static input:ByteArray;		
	
	/**
	 * 类型
	 */
	public type :number ;	//uint32		
	/**
	 * uid
	 */
	public uid :string ;	//String		
	/**
	 * guid
	 */
	public guid :string ;	//String		
	/**
	 * 内容
	 */
	public log :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_write_client_log, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//类型
		self.type = this.input. readUint32 ();		
		
		//uid
		self.uid = this.input. readString ();		
		
		//guid
		self.guid = this.input. readString ();		
		
		//内容
		self.log = this.input. readString ();		
		
	}
}





class s2c_operation_failed
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onOperation_failed"; 
	private static input:ByteArray;		
	
	/**
	 * 操作类型
	 */
	public type :number ;	//uint16		
	/**
	 * 失败原因
	 */
	public reason :number ;	//uint16		
	/**
	 * 预留参数
	 */
	public data :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_operation_failed, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//操作类型
		self.type = this.input. readUint16 ();		
		
		//失败原因
		self.reason = this.input. readUint16 ();		
		
		//预留参数
		self.data = this.input. readString ();		
		
	}
}





class both_sync_mstime
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onSync_mstime"; 
	private static input:ByteArray;		
	
	/**
	 * 服务器运行的毫秒数
	 */
	public mstime_now :number ;	//uint32		
	/**
	 * 自然时间
	 */
	public time_now :number ;	//uint32		
	/**
	 * 自然时间的服务器启动时间
	 */
	public open_time :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_sync_mstime, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//服务器运行的毫秒数
		self.mstime_now = this.input. readUint32 ();		
		
		//自然时间
		self.time_now = this.input. readUint32 ();		
		
		//自然时间的服务器启动时间
		self.open_time = this.input. readUint32 ();		
		
	}
}





class s2c_ud_object
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onUd_object"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_ud_object, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_ud_control
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onUd_control"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_ud_control, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_ud_control_result
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onUd_control_result"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_ud_control_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_grid_ud_object
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGrid_ud_object"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_grid_ud_object, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_grid_ud_object_2
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGrid_ud_object_2"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_grid_ud_object_2, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_login_queue_index
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onLogin_queue_index"; 
	private static input:ByteArray;		
	
	/**
	 * 目前自己排在登录队列的第几位
	 */
	public index :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_login_queue_index, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//目前自己排在登录队列的第几位
		self.index = this.input. readUint32 ();		
		
	}
}





class s2c_kicking_type
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onKicking_type"; 
	private static input:ByteArray;		
	
	/**
	 * 踢人枚举
	 */
	public k_type :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_kicking_type, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//踢人枚举
		self.k_type = this.input. readUint32 ();		
		
	}
}





class c2s_get_chars_list
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGet_chars_list"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_chars_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_chars_list
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onChars_list"; 
	private static input:ByteArray;		
	
	/**
	 * 角色列表
	 */
	public list :Array<char_create_info > = new Array(); //char_create_info
	/**
	 * 家族名称
	 */
	public faction_name :string ;	//String		
	/**
	 * 女王名称
	 */
	public queen_name :string ;	//String		
	/**
	 * 图标
	 */
	public icon :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_chars_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//角色列表
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:char_create_info = new char_create_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
		//家族名称
		self.faction_name = this.input. readString ();		
		
		//女王名称
		self.queen_name = this.input. readString ();		
		
		//图标
		self.icon = this.input. readUint8 ();		
		
	}
}





class c2s_check_name
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onCheck_name"; 
	private static input:ByteArray;		
	
	/**
	 * 名称
	 */
	public name :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_check_name, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//名称
		self.name = this.input. readString ();		
		
	}
}





class s2c_check_name_result
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onCheck_name_result"; 
	private static input:ByteArray;		
	
	/**
	 * 结果
	 */
	public result :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_check_name_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//结果
		self.result = this.input. readUint8 ();		
		
	}
}





class c2s_char_create
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onChar_create"; 
	private static input:ByteArray;		
	
	/**
	 * 角色创建信息
	 */
	public info :char_create_info  ;	//char_create_info		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_char_create, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//角色创建信息
		self.info = new char_create_info;
		self.info .read(this.input);
		
	}
}





class s2c_char_create_result
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onChar_create_result"; 
	private static input:ByteArray;		
	
	/**
	 * 结果
	 */
	public result :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_char_create_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//结果
		self.result = this.input. readUint8 ();		
		
	}
}





class c2s_delete_char
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onDelete_char"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家ID
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_delete_char, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家ID
		self.id = this.input. readUint32 ();		
		
	}
}





class s2c_delete_char_result
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onDelete_char_result"; 
	private static input:ByteArray;		
	
	/**
	 * 结果
	 */
	public result :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_delete_char_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//结果
		self.result = this.input. readUint8 ();		
		
	}
}





class c2s_player_login
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPlayer_login"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家ID
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_player_login, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家ID
		self.guid = this.input. readString ();		
		
	}
}





class c2s_player_logout
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onPlayer_logout"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_player_logout, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_regularise_account
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onRegularise_account"; 
	private static input:ByteArray;		
	
	/**
	 * 
	 */
	public uid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_regularise_account, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//
		self.uid = this.input. readString ();		
		
	}
}





class c2s_char_remotestore
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onChar_remotestore"; 
	private static input:ByteArray;		
	
	/**
	 * 类型
	 */
	public key :number ;	//uint32		
	/**
	 * 配置信息
	 */
	public value :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_char_remotestore, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//类型
		self.key = this.input. readUint32 ();		
		
		//配置信息
		self.value = this.input. readUint32 ();		
		
	}
}





class c2s_char_remotestore_str
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onChar_remotestore_str"; 
	private static input:ByteArray;		
	
	/**
	 * 类型
	 */
	public key :number ;	//uint32		
	/**
	 * 配置信息
	 */
	public value :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_char_remotestore_str, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//类型
		self.key = this.input. readUint32 ();		
		
		//配置信息
		self.value = this.input. readString ();		
		
	}
}





class c2s_teleport
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onTeleport"; 
	private static input:ByteArray;		
	
	/**
	 * 传送点intGuid
	 */
	public intGuid :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_teleport, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//传送点intGuid
		self.intGuid = this.input. readUint32 ();		
		
	}
}





class both_move_stop
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onMove_stop"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家GUID
	 */
	public guid :number ;	//uint32		
	/**
	 * 
	 */
	public pos_x :number ;	//uint16		
	/**
	 * 
	 */
	public pos_y :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_move_stop, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家GUID
		self.guid = this.input. readUint32 ();		
		
		//
		self.pos_x = this.input. readUint16 ();		
		
		//
		self.pos_y = this.input. readUint16 ();		
		
	}
}





class both_unit_move
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onUnit_move"; 
	private static input:ByteArray;		
	
	/**
	 * 怪物GUID
	 */
	public guid :number ;	//uint32		
	/**
	 * 
	 */
	public pos_x :number ;	//uint16		
	/**
	 * 
	 */
	public pos_y :number ;	//uint16		
	/**
	 * 路线
	 */
	public path :Array<number> = new Array(); //int8

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_unit_move, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//怪物GUID
		self.guid = this.input. readUint32 ();		
		
		//
		self.pos_x = this.input. readUint16 ();		
		
		//
		self.pos_y = this.input. readUint16 ();		
		
		//路线
		self.path .length = 0;		//清空数组				
		var parmLen:number = this.input.readUint16();
		for(var i:number=0;i<parmLen;i++){				
			self.path .push( this.input.readInt8 ());
		}
		
	}
}





class c2s_use_gameobject
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onUse_gameobject"; 
	private static input:ByteArray;		
	
	/**
	 * 目标
	 */
	public target :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_use_gameobject, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//目标
		self.target = this.input. readUint32 ();		
		
	}
}





class c2s_bag_exchange_pos
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onBag_exchange_pos"; 
	private static input:ByteArray;		
	
	/**
	 * 源包裹
	 */
	public src_bag :number ;	//uint32		
	/**
	 * 源位置
	 */
	public src_pos :number ;	//uint32		
	/**
	 * 目标包裹
	 */
	public dst_bag :number ;	//uint32		
	/**
	 * 目标位置
	 */
	public dst_pos :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_bag_exchange_pos, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//源包裹
		self.src_bag = this.input. readUint32 ();		
		
		//源位置
		self.src_pos = this.input. readUint32 ();		
		
		//目标包裹
		self.dst_bag = this.input. readUint32 ();		
		
		//目标位置
		self.dst_pos = this.input. readUint32 ();		
		
	}
}





class c2s_bag_destroy
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onBag_destroy"; 
	private static input:ByteArray;		
	
	/**
	 * 物品guid
	 */
	public item_guid :string ;	//String		
	/**
	 * 数量（预留）
	 */
	public num :number ;	//uint32		
	/**
	 * 包裹ID
	 */
	public bag_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_bag_destroy, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//物品guid
		self.item_guid = this.input. readString ();		
		
		//数量（预留）
		self.num = this.input. readUint32 ();		
		
		//包裹ID
		self.bag_id = this.input. readUint32 ();		
		
	}
}





class c2s_bag_item_split
{				
	public optcode:number = 0;
	public static param_count:number = 5;
	public static optname:string = "onBag_item_split"; 
	private static input:ByteArray;		
	
	/**
	 * 包裹ID
	 */
	public bag_id :number ;	//uint8		
	/**
	 * 切割哪个位置物品
	 */
	public src_pos :number ;	//uint16		
	/**
	 * 切割多少出去
	 */
	public count :number ;	//uint32		
	/**
	 * 切割到什么位置
	 */
	public dst_pos :number ;	//uint16		
	/**
	 * 切割到什么包裹
	 */
	public dst_bag :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_bag_item_split, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//包裹ID
		self.bag_id = this.input. readUint8 ();		
		
		//切割哪个位置物品
		self.src_pos = this.input. readUint16 ();		
		
		//切割多少出去
		self.count = this.input. readUint32 ();		
		
		//切割到什么位置
		self.dst_pos = this.input. readUint16 ();		
		
		//切割到什么包裹
		self.dst_bag = this.input. readUint8 ();		
		
	}
}





class c2s_bag_item_user
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onBag_item_user"; 
	private static input:ByteArray;		
	
	/**
	 * 物品guid
	 */
	public item_guid :string ;	//String		
	/**
	 * 个数
	 */
	public count :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_bag_item_user, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//物品guid
		self.item_guid = this.input. readString ();		
		
		//个数
		self.count = this.input. readUint32 ();		
		
	}
}





class s2c_bag_item_cooldown
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onBag_item_cooldown"; 
	private static input:ByteArray;		
	
	/**
	 * 冷却信息列表
	 */
	public list :Array<item_cooldown_info > = new Array(); //item_cooldown_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_bag_item_cooldown, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//冷却信息列表
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:item_cooldown_info = new item_cooldown_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class s2c_grid_unit_move
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGrid_unit_move"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_grid_unit_move, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_grid_unit_move_2
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGrid_unit_move_2"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_grid_unit_move_2, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_exchange_item
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onExchange_item"; 
	private static input:ByteArray;		
	
	/**
	 * 物品模版
	 */
	public entry :number ;	//uint32		
	/**
	 * 兑换数量
	 */
	public count :number ;	//uint32		
	/**
	 * 兑换物品模版
	 */
	public tar_entry :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_exchange_item, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//物品模版
		self.entry = this.input. readUint32 ();		
		
		//兑换数量
		self.count = this.input. readUint32 ();		
		
		//兑换物品模版
		self.tar_entry = this.input. readUint32 ();		
		
	}
}





class c2s_bag_extension
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onBag_extension"; 
	private static input:ByteArray;		
	
	/**
	 * 包裹
	 */
	public bag_id :number ;	//uint8		
	/**
	 * 扩展类型
	 */
	public extension_type :number ;	//uint8		
	/**
	 * 开启位置
	 */
	public bag_pos :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_bag_extension, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//包裹
		self.bag_id = this.input. readUint8 ();		
		
		//扩展类型
		self.extension_type = this.input. readUint8 ();		
		
		//开启位置
		self.bag_pos = this.input. readUint32 ();		
		
	}
}





class c2s_npc_get_goods_list
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onNpc_get_goods_list"; 
	private static input:ByteArray;		
	
	/**
	 * 
	 */
	public npc_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_npc_get_goods_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//
		self.npc_id = this.input. readUint32 ();		
		
	}
}





class s2c_npc_goods_list
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onNpc_goods_list"; 
	private static input:ByteArray;		
	
	/**
	 * 商品列表
	 */
	public goods :Array<number> = new Array(); //uint32
	/**
	 * 
	 */
	public npc_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_npc_goods_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//商品列表
		self.goods .length = 0;		//清空数组				
		var parmLen:number = this.input.readUint16();
		for(var i:number=0;i<parmLen;i++){				
			self.goods .push( this.input.readUint32 ());
		}
		
		//
		self.npc_id = this.input. readUint32 ();		
		
	}
}





class c2s_store_buy
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onStore_buy"; 
	private static input:ByteArray;		
	
	/**
	 * 商品id
	 */
	public id :number ;	//uint32		
	/**
	 * 商品数量
	 */
	public count :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_store_buy, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//商品id
		self.id = this.input. readUint32 ();		
		
		//商品数量
		self.count = this.input. readUint32 ();		
		
	}
}





class c2s_npc_sell
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onNpc_sell"; 
	private static input:ByteArray;		
	
	/**
	 * NPCID
	 */
	public npc_id :number ;	//uint32		
	/**
	 * 物品guid
	 */
	public item_guid :string ;	//String		
	/**
	 * 数量
	 */
	public num :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_npc_sell, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//NPCID
		self.npc_id = this.input. readUint32 ();		
		
		//物品guid
		self.item_guid = this.input. readString ();		
		
		//数量
		self.num = this.input. readUint32 ();		
		
	}
}





class c2s_npc_repurchase
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onNpc_repurchase"; 
	private static input:ByteArray;		
	
	/**
	 * 物品guid
	 */
	public item_id :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_npc_repurchase, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//物品guid
		self.item_id = this.input. readString ();		
		
	}
}





class c2s_avatar_fashion_enable
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onAvatar_fashion_enable"; 
	private static input:ByteArray;		
	
	/**
	 * 时装装备位置
	 */
	public pos :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_avatar_fashion_enable, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//时装装备位置
		self.pos = this.input. readUint8 ();		
		
	}
}





class c2s_questhelp_talk_option
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onQuesthelp_talk_option"; 
	private static input:ByteArray;		
	
	/**
	 * 任务ID
	 */
	public quest_id :number ;	//uint32		
	/**
	 * 选项ID
	 */
	public option_id :number ;	//uint32		
	/**
	 * 
	 */
	public value0 :number ;	//int32		
	/**
	 * 
	 */
	public value1 :number ;	//int32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_questhelp_talk_option, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务ID
		self.quest_id = this.input. readUint32 ();		
		
		//选项ID
		self.option_id = this.input. readUint32 ();		
		
		//
		self.value0 = this.input. readInt32 ();		
		
		//
		self.value1 = this.input. readInt32 ();		
		
	}
}





class c2s_taxi_hello
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onTaxi_hello"; 
	private static input:ByteArray;		
	
	/**
	 * npc guid
	 */
	public guid :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_taxi_hello, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//npc guid
		self.guid = this.input. readUint32 ();		
		
	}
}





class s2c_taxi_stations_list
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onTaxi_stations_list"; 
	private static input:ByteArray;		
	
	/**
	 * 
	 */
	public npcid :number ;	//uint32		
	/**
	 * 传送点列表
	 */
	public stations :Array<taxi_menu_info > = new Array(); //taxi_menu_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_taxi_stations_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//
		self.npcid = this.input. readUint32 ();		
		
		//传送点列表
		if( self.stations .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _stations:taxi_menu_info = new taxi_menu_info;
			_stations .read(this.input);
			self.stations .push(_stations);
		}
		
	}
}





class c2s_taxi_select_station
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onTaxi_select_station"; 
	private static input:ByteArray;		
	
	/**
	 * 
	 */
	public station_id :number ;	//uint32		
	/**
	 * 
	 */
	public guid :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_taxi_select_station, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//
		self.station_id = this.input. readUint32 ();		
		
		//
		self.guid = this.input. readUint32 ();		
		
	}
}





class c2s_gossip_select_option
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onGossip_select_option"; 
	private static input:ByteArray;		
	
	/**
	 * 选项ID
	 */
	public option :number ;	//uint32		
	/**
	 * NPCguid
	 */
	public guid :number ;	//uint32		
	/**
	 * 输入值
	 */
	public unknow :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_gossip_select_option, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//选项ID
		self.option = this.input. readUint32 ();		
		
		//NPCguid
		self.guid = this.input. readUint32 ();		
		
		//输入值
		self.unknow = this.input. readString ();		
		
	}
}





class c2s_gossip_hello
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGossip_hello"; 
	private static input:ByteArray;		
	
	/**
	 * 交流目标
	 */
	public guid :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_gossip_hello, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//交流目标
		self.guid = this.input. readUint32 ();		
		
	}
}





class s2c_gossip_message
{				
	public optcode:number = 0;
	public static param_count:number = 5;
	public static optname:string = "onGossip_message"; 
	private static input:ByteArray;		
	
	/**
	 * NPC ID
	 */
	public npcid :number ;	//uint32		
	/**
	 * npc模版id
	 */
	public npc_entry :number ;	//uint32		
	/**
	 * 闲聊素材表id
	 */
	public option_id :number ;	//uint32		
	/**
	 * 闲聊文本
	 */
	public option_text :string ;	//String		
	/**
	 * 闲聊列表
	 */
	public gossip_items :Array<gossip_menu_option_info > = new Array(); //gossip_menu_option_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_gossip_message, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//NPC ID
		self.npcid = this.input. readUint32 ();		
		
		//npc模版id
		self.npc_entry = this.input. readUint32 ();		
		
		//闲聊素材表id
		self.option_id = this.input. readUint32 ();		
		
		//闲聊文本
		self.option_text = this.input. readString ();		
		
		//闲聊列表
		if( self.gossip_items .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _gossip_items:gossip_menu_option_info = new gossip_menu_option_info;
			_gossip_items .read(this.input);
			self.gossip_items .push(_gossip_items);
		}
		
	}
}





class c2s_questgiver_status_query
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onQuestgiver_status_query"; 
	private static input:ByteArray;		
	
	/**
	 * NPC GUID
	 */
	public guid :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_questgiver_status_query, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//NPC GUID
		self.guid = this.input. readUint32 ();		
		
	}
}





class s2c_questgiver_status
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onQuestgiver_status"; 
	private static input:ByteArray;		
	
	/**
	 * NPC GUI
	 */
	public guid :number ;	//uint32		
	/**
	 * 状态
	 */
	public status :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_questgiver_status, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//NPC GUI
		self.guid = this.input. readUint32 ();		
		
		//状态
		self.status = this.input. readUint8 ();		
		
	}
}





class both_query_quest_status
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onQuery_quest_status"; 
	private static input:ByteArray;		
	
	/**
	 * 
	 */
	public quest_array :Array<quest_status > = new Array(); //quest_status

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_query_quest_status, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//
		if( self.quest_array .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _quest_array:quest_status = new quest_status;
			_quest_array .read(this.input);
			self.quest_array .push(_quest_array);
		}
		
	}
}





class c2s_questhelp_get_canaccept_list
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onQuesthelp_get_canaccept_list"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_questhelp_get_canaccept_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_questhelp_canaccept_list
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onQuesthelp_canaccept_list"; 
	private static input:ByteArray;		
	
	/**
	 * 任务列表
	 */
	public quests :Array<number> = new Array(); //uint32

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_questhelp_canaccept_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务列表
		self.quests .length = 0;		//清空数组				
		var parmLen:number = this.input.readUint16();
		for(var i:number=0;i<parmLen;i++){				
			self.quests .push( this.input.readUint32 ());
		}
		
	}
}





class s2c_questupdate_faild
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onQuestupdate_faild"; 
	private static input:ByteArray;		
	
	/**
	 * 失败原因
	 */
	public reason :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_questupdate_faild, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//失败原因
		self.reason = this.input. readUint8 ();		
		
	}
}





class s2c_questupdate_complete
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onQuestupdate_complete"; 
	private static input:ByteArray;		
	
	/**
	 * 任务ID
	 */
	public quest_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_questupdate_complete, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务ID
		self.quest_id = this.input. readUint32 ();		
		
	}
}





class c2s_questlog_remove_quest
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onQuestlog_remove_quest"; 
	private static input:ByteArray;		
	
	/**
	 * 任务下标位置
	 */
	public slot :number ;	//uint8		
	/**
	 * 保留
	 */
	public reserve :number ;	//uint64		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_questlog_remove_quest, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务下标位置
		self.slot = this.input. readUint8 ();		
		
		//保留
		self.reserve = this.input. readUint64 ();		
		
	}
}





class c2s_questgiver_complete_quest
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onQuestgiver_complete_quest"; 
	private static input:ByteArray;		
	
	/**
	 * NPC_GUID
	 */
	public guid :number ;	//uint32		
	/**
	 * 任务ID
	 */
	public quest_id :number ;	//uint32		
	/**
	 * 选择奖励项
	 */
	public reward :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_questgiver_complete_quest, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//NPC_GUID
		self.guid = this.input. readUint32 ();		
		
		//任务ID
		self.quest_id = this.input. readUint32 ();		
		
		//选择奖励项
		self.reward = this.input. readUint8 ();		
		
	}
}





class s2c_questhelp_next
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onQuesthelp_next"; 
	private static input:ByteArray;		
	
	/**
	 * 当前任务
	 */
	public current_id :number ;	//uint32		
	/**
	 * 下一个任务
	 */
	public next_id :number ;	//uint32		
	/**
	 * NPC_GUID
	 */
	public guid :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_questhelp_next, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//当前任务
		self.current_id = this.input. readUint32 ();		
		
		//下一个任务
		self.next_id = this.input. readUint32 ();		
		
		//NPC_GUID
		self.guid = this.input. readUint32 ();		
		
	}
}





class c2s_questhelp_complete
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onQuesthelp_complete"; 
	private static input:ByteArray;		
	
	/**
	 * 任务ID
	 */
	public quest_id :number ;	//uint32		
	/**
	 * 任务
	 */
	public quest_statue :number ;	//uint8		
	/**
	 * 保留
	 */
	public reserve :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_questhelp_complete, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务ID
		self.quest_id = this.input. readUint32 ();		
		
		//任务
		self.quest_statue = this.input. readUint8 ();		
		
		//保留
		self.reserve = this.input. readUint8 ();		
		
	}
}





class s2c_questupdate_accept
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onQuestupdate_accept"; 
	private static input:ByteArray;		
	
	/**
	 * 任务ID
	 */
	public quest_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_questupdate_accept, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务ID
		self.quest_id = this.input. readUint32 ();		
		
	}
}





class c2s_questhelp_update_status
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onQuesthelp_update_status"; 
	private static input:ByteArray;		
	
	/**
	 * 任务ID
	 */
	public quest_id :number ;	//uint32		
	/**
	 * 下标ID
	 */
	public slot_id :number ;	//uint32		
	/**
	 * 增加数量
	 */
	public num :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_questhelp_update_status, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务ID
		self.quest_id = this.input. readUint32 ();		
		
		//下标ID
		self.slot_id = this.input. readUint32 ();		
		
		//增加数量
		self.num = this.input. readUint32 ();		
		
	}
}





class s2c_questgetter_complete
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onQuestgetter_complete"; 
	private static input:ByteArray;		
	
	/**
	 * 任务ID
	 */
	public quest_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_questgetter_complete, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务ID
		self.quest_id = this.input. readUint32 ();		
		
	}
}





class c2s_questgiver_accept_quest
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onQuestgiver_accept_quest"; 
	private static input:ByteArray;		
	
	/**
	 * npcGUID
	 */
	public npcid :number ;	//uint32		
	/**
	 * 
	 */
	public quest_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_questgiver_accept_quest, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//npcGUID
		self.npcid = this.input. readUint32 ();		
		
		//
		self.quest_id = this.input. readUint32 ();		
		
	}
}





class c2s_questupdate_use_item
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onQuestupdate_use_item"; 
	private static input:ByteArray;		
	
	/**
	 * 任务物品ID
	 */
	public item_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_questupdate_use_item, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务物品ID
		self.item_id = this.input. readUint32 ();		
		
	}
}





class c2s_questhelp_query_book
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onQuesthelp_query_book"; 
	private static input:ByteArray;		
	
	/**
	 * 朝代
	 */
	public dynasty :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_questhelp_query_book, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//朝代
		self.dynasty = this.input. readUint32 ();		
		
	}
}





class s2c_questhelp_book_quest
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onQuesthelp_book_quest"; 
	private static input:ByteArray;		
	
	/**
	 * 任务ID
	 */
	public quest_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_questhelp_book_quest, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务ID
		self.quest_id = this.input. readUint32 ();		
		
	}
}





class s2c_use_gameobject_action
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onUse_gameobject_action"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家ID
	 */
	public player_id :number ;	//uint32		
	/**
	 * 游戏对象ID
	 */
	public gameobject_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_use_gameobject_action, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家ID
		self.player_id = this.input. readUint32 ();		
		
		//游戏对象ID
		self.gameobject_id = this.input. readUint32 ();		
		
	}
}





class c2s_set_attack_mode
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onSet_attack_mode"; 
	private static input:ByteArray;		
	
	/**
	 * 模式
	 */
	public mode :number ;	//uint8		
	/**
	 * 保留
	 */
	public reserve :number ;	//uint64		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_set_attack_mode, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//模式
		self.mode = this.input. readUint8 ();		
		
		//保留
		self.reserve = this.input. readUint64 ();		
		
	}
}





class both_select_target
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSelect_target"; 
	private static input:ByteArray;		
	
	/**
	 * 目标GUID
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_select_target, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//目标GUID
		self.id = this.input. readUint32 ();		
		
	}
}





class s2c_combat_state_update
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onCombat_state_update"; 
	private static input:ByteArray;		
	
	/**
	 * 当前状态 0：脱离战斗 1：进入战斗
	 */
	public cur_state :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_combat_state_update, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//当前状态 0：脱离战斗 1：进入战斗
		self.cur_state = this.input. readUint8 ();		
		
	}
}





class s2c_exp_update
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onExp_update"; 
	private static input:ByteArray;		
	
	/**
	 * 改变的经验
	 */
	public exp :number ;	//int32		
	/**
	 * 加成
	 */
	public added :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_exp_update, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//改变的经验
		self.exp = this.input. readInt32 ();		
		
		//加成
		self.added = this.input. readUint8 ();		
		
	}
}





class both_spell_start
{				
	public optcode:number = 0;
	public static param_count:number = 5;
	public static optname:string = "onSpell_start"; 
	private static input:ByteArray;		
	
	/**
	 * 技能ID
	 */
	public spell_id :number ;	//uint32		
	/**
	 * 
	 */
	public target_pos_x :number ;	//uint16		
	/**
	 * 
	 */
	public target_pos_y :number ;	//uint16		
	/**
	 * 
	 */
	public caster :number ;	//uint32		
	/**
	 * 目标
	 */
	public target :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_spell_start, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//技能ID
		self.spell_id = this.input. readUint32 ();		
		
		//
		self.target_pos_x = this.input. readUint16 ();		
		
		//
		self.target_pos_y = this.input. readUint16 ();		
		
		//
		self.caster = this.input. readUint32 ();		
		
		//目标
		self.target = this.input. readUint32 ();		
		
	}
}





class both_spell_stop
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSpell_stop"; 
	private static input:ByteArray;		
	
	/**
	 * 停止施法者
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_spell_stop, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//停止施法者
		self.guid = this.input. readString ();		
		
	}
}





class both_jump
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onJump"; 
	private static input:ByteArray;		
	
	/**
	 * 跳的对象
	 */
	public guid :number ;	//uint32		
	/**
	 * 目的地坐标
	 */
	public pos_x :number ;	//float		
	/**
	 * 
	 */
	public pos_y :number ;	//float		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_jump, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//跳的对象
		self.guid = this.input. readUint32 ();		
		
		//目的地坐标
		self.pos_x = this.input. readFloat ();		
		
		//
		self.pos_y = this.input. readFloat ();		
		
	}
}





class c2s_resurrection
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onResurrection"; 
	private static input:ByteArray;		
	
	/**
	 * 0:原地复活 1:回城复活
	 */
	public type :number ;	//uint8		
	/**
	 * 保留
	 */
	public reserve :number ;	//uint64		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_resurrection, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//0:原地复活 1:回城复活
		self.type = this.input. readUint8 ();		
		
		//保留
		self.reserve = this.input. readUint64 ();		
		
	}
}





class both_trade_request
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onTrade_request"; 
	private static input:ByteArray;		
	
	/**
	 * 被请求人guid
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_trade_request, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//被请求人guid
		self.guid = this.input. readString ();		
		
	}
}





class both_trade_reply
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onTrade_reply"; 
	private static input:ByteArray;		
	
	/**
	 * 请求交易的人guid
	 */
	public guid :string ;	//String		
	/**
	 * 0:拒绝1:接受
	 */
	public reply :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_trade_reply, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//请求交易的人guid
		self.guid = this.input. readString ();		
		
		//0:拒绝1:接受
		self.reply = this.input. readUint8 ();		
		
	}
}





class s2c_trade_start
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onTrade_start"; 
	private static input:ByteArray;		
	
	/**
	 * 你的交易目标
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_trade_start, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//你的交易目标
		self.guid = this.input. readString ();		
		
	}
}





class both_trade_decide_items
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onTrade_decide_items"; 
	private static input:ByteArray;		
	
	/**
	 * 确认交易的物品
	 */
	public items :Array<string> = new Array(); //String
	/**
	 * 元宝
	 */
	public gold_ingot :number ;	//int32		
	/**
	 * 银子
	 */
	public silver :number ;	//int32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_trade_decide_items, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//确认交易的物品
		self.items .length = 0;		//清空数组				
		var parmLen:number = this.input.readUint16();
		for(var i:number=0;i<parmLen;i++){				
			self.items .push( this.input.readString ());
		}
		
		//元宝
		self.gold_ingot = this.input. readInt32 ();		
		
		//银子
		self.silver = this.input. readInt32 ();		
		
	}
}





class s2c_trade_finish
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onTrade_finish"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_trade_finish, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class both_trade_cancel
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onTrade_cancel"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_trade_cancel, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class both_trade_ready
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onTrade_ready"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_trade_ready, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_chat_unit_talk
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onChat_unit_talk"; 
	private static input:ByteArray;		
	
	/**
	 * 发言者id
	 */
	public guid :number ;	//uint32		
	/**
	 * 发言内容摸版id
	 */
	public content :number ;	//uint32		
	/**
	 * 发言字符
	 */
	public say :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_chat_unit_talk, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//发言者id
		self.guid = this.input. readUint32 ();		
		
		//发言内容摸版id
		self.content = this.input. readUint32 ();		
		
		//发言字符
		self.say = this.input. readString ();		
		
	}
}





class c2s_chat_near
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onChat_near"; 
	private static input:ByteArray;		
	
	/**
	 * 发言内容
	 */
	public content :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_chat_near, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//发言内容
		self.content = this.input. readString ();		
		
	}
}





class c2s_chat_whisper
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onChat_whisper"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家id
	 */
	public guid :string ;	//String		
	/**
	 * 说话内容
	 */
	public content :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_chat_whisper, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家id
		self.guid = this.input. readString ();		
		
		//说话内容
		self.content = this.input. readString ();		
		
	}
}





class both_chat_faction
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onChat_faction"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家id
	 */
	public guid :string ;	//String		
	/**
	 * 玩家名称
	 */
	public name :string ;	//String		
	/**
	 * 说话内容
	 */
	public content :string ;	//String		
	/**
	 * 玩家阵营
	 */
	public faction :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_chat_faction, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家id
		self.guid = this.input. readString ();		
		
		//玩家名称
		self.name = this.input. readString ();		
		
		//说话内容
		self.content = this.input. readString ();		
		
		//玩家阵营
		self.faction = this.input. readUint8 ();		
		
	}
}





class both_chat_world
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onChat_world"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家guid
	 */
	public guid :string ;	//String		
	/**
	 * 玩家阵营
	 */
	public faction :number ;	//uint8		
	/**
	 * 玩家名称
	 */
	public name :string ;	//String		
	/**
	 * 说话内容
	 */
	public content :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_chat_world, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家guid
		self.guid = this.input. readString ();		
		
		//玩家阵营
		self.faction = this.input. readUint8 ();		
		
		//玩家名称
		self.name = this.input. readString ();		
		
		//说话内容
		self.content = this.input. readString ();		
		
	}
}





class both_chat_horn
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onChat_horn"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家guid
	 */
	public guid :string ;	//String		
	/**
	 * 玩家阵营
	 */
	public faction :number ;	//uint8		
	/**
	 * 玩家名称
	 */
	public name :string ;	//String		
	/**
	 * 说话内容
	 */
	public content :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_chat_horn, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家guid
		self.guid = this.input. readString ();		
		
		//玩家阵营
		self.faction = this.input. readUint8 ();		
		
		//玩家名称
		self.name = this.input. readString ();		
		
		//说话内容
		self.content = this.input. readString ();		
		
	}
}





class both_chat_notice
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onChat_notice"; 
	private static input:ByteArray;		
	
	/**
	 * 公告id
	 */
	public id :number ;	//uint32		
	/**
	 * 公告内容
	 */
	public content :string ;	//String		
	/**
	 * 预留参数
	 */
	public data :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_chat_notice, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//公告id
		self.id = this.input. readUint32 ();		
		
		//公告内容
		self.content = this.input. readString ();		
		
		//预留参数
		self.data = this.input. readString ();		
		
	}
}





class c2s_query_player_info
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onQuery_player_info"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家guid
	 */
	public guid :string ;	//String		
	/**
	 * 每一位表示玩家各种信息
	 */
	public flag :number ;	//uint32		
	/**
	 * 回调ID
	 */
	public callback_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_query_player_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家guid
		self.guid = this.input. readString ();		
		
		//每一位表示玩家各种信息
		self.flag = this.input. readUint32 ();		
		
		//回调ID
		self.callback_id = this.input. readUint32 ();		
		
	}
}





class s2c_query_result_update_object
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onQuery_result_update_object"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_query_result_update_object, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_receive_gift_packs
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onReceive_gift_packs"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_receive_gift_packs, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_map_update_object
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onMap_update_object"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_map_update_object, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_fighting_info_update_object
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onFighting_info_update_object"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_fighting_info_update_object, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_fighting_info_update_object_2
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onFighting_info_update_object_2"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_fighting_info_update_object_2, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_instance_enter
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onInstance_enter"; 
	private static input:ByteArray;		
	
	/**
	 * 副本ID
	 */
	public instance_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_instance_enter, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//副本ID
		self.instance_id = this.input. readUint32 ();		
		
	}
}





class c2s_instance_next_state
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onInstance_next_state"; 
	private static input:ByteArray;		
	
	/**
	 * 进入关卡
	 */
	public level :number ;	//uint16		
	/**
	 * 预留参数
	 */
	public param :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_instance_next_state, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//进入关卡
		self.level = this.input. readUint16 ();		
		
		//预留参数
		self.param = this.input. readUint32 ();		
		
	}
}





class c2s_instance_exit
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onInstance_exit"; 
	private static input:ByteArray;		
	
	/**
	 * 保留
	 */
	public reserve :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_instance_exit, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//保留
		self.reserve = this.input. readUint32 ();		
		
	}
}





class c2s_limit_activity_receive
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onLimit_activity_receive"; 
	private static input:ByteArray;		
	
	/**
	 * 领取id
	 */
	public id :number ;	//uint32		
	/**
	 * 领取类型
	 */
	public type :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_limit_activity_receive, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//领取id
		self.id = this.input. readUint32 ();		
		
		//领取类型
		self.type = this.input. readUint32 ();		
		
	}
}





class s2c_kill_man
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onKill_man"; 
	private static input:ByteArray;		
	
	/**
	 * 杀人者
	 */
	public killer :string ;	//String		
	/**
	 * 杀人者名字
	 */
	public killer_name :string ;	//String		
	/**
	 * 被杀者
	 */
	public victim :string ;	//String		
	/**
	 * 被杀者名字
	 */
	public victim_name :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_kill_man, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//杀人者
		self.killer = this.input. readString ();		
		
		//杀人者名字
		self.killer_name = this.input. readString ();		
		
		//被杀者
		self.victim = this.input. readString ();		
		
		//被杀者名字
		self.victim_name = this.input. readString ();		
		
	}
}





class s2c_player_upgrade
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPlayer_upgrade"; 
	private static input:ByteArray;		
	
	/**
	 * 升级的玩家低位GUID
	 */
	public guid :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_player_upgrade, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//升级的玩家低位GUID
		self.guid = this.input. readUint32 ();		
		
	}
}





class c2s_warehouse_save_money
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onWarehouse_save_money"; 
	private static input:ByteArray;		
	
	/**
	 * 多少钱
	 */
	public money :number ;	//int32		
	/**
	 * 多少元宝
	 */
	public money_gold :number ;	//int32		
	/**
	 * 多少银票
	 */
	public money_bills :number ;	//int32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_warehouse_save_money, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//多少钱
		self.money = this.input. readInt32 ();		
		
		//多少元宝
		self.money_gold = this.input. readInt32 ();		
		
		//多少银票
		self.money_bills = this.input. readInt32 ();		
		
	}
}





class c2s_warehouse_take_money
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onWarehouse_take_money"; 
	private static input:ByteArray;		
	
	/**
	 * 多少钱
	 */
	public money :number ;	//int32		
	/**
	 * 多少元宝
	 */
	public money_gold :number ;	//int32		
	/**
	 * 多少银票
	 */
	public money_bills :number ;	//int32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_warehouse_take_money, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//多少钱
		self.money = this.input. readInt32 ();		
		
		//多少元宝
		self.money_gold = this.input. readInt32 ();		
		
		//多少银票
		self.money_bills = this.input. readInt32 ();		
		
	}
}





class c2s_use_gold_opt
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onUse_gold_opt"; 
	private static input:ByteArray;		
	
	/**
	 * 操作类型
	 */
	public type :number ;	//uint8		
	/**
	 * 字符串
	 */
	public param :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_use_gold_opt, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//操作类型
		self.type = this.input. readUint8 ();		
		
		//字符串
		self.param = this.input. readString ();		
		
	}
}





class c2s_use_silver_opt
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onUse_silver_opt"; 
	private static input:ByteArray;		
	
	/**
	 * 使用铜钱类型
	 */
	public type :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_use_silver_opt, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//使用铜钱类型
		self.type = this.input. readUint8 ();		
		
	}
}





class s2c_gm_rightfloat
{				
	public optcode:number = 0;
	public static param_count:number = 9;
	public static optname:string = "onGm_rightfloat"; 
	private static input:ByteArray;		
	
	/**
	 * ID
	 */
	public id :number ;	//uint32		
	/**
	 * 结束时间
	 */
	public end_time :number ;	//uint32		
	/**
	 * 0-7点
	 */
	public zone1 :number ;	//uint32		
	/**
	 * 8-13点
	 */
	public zone2 :number ;	//uint32		
	/**
	 * 14-23点
	 */
	public zone3 :number ;	//uint32		
	/**
	 * 标题
	 */
	public subject :string ;	//String		
	/**
	 * 内容
	 */
	public content :string ;	//String		
	/**
	 * 链接地址
	 */
	public link :string ;	//String		
	/**
	 * 模式 0:根据zone1，zone2，zone3设置的时间段弹 1:进入游戏1分钟后弹
	 */
	public mode :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_gm_rightfloat, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//ID
		self.id = this.input. readUint32 ();		
		
		//结束时间
		self.end_time = this.input. readUint32 ();		
		
		//0-7点
		self.zone1 = this.input. readUint32 ();		
		
		//8-13点
		self.zone2 = this.input. readUint32 ();		
		
		//14-23点
		self.zone3 = this.input. readUint32 ();		
		
		//标题
		self.subject = this.input. readString ();		
		
		//内容
		self.content = this.input. readString ();		
		
		//链接地址
		self.link = this.input. readString ();		
		
		//模式 0:根据zone1，zone2，zone3设置的时间段弹 1:进入游戏1分钟后弹
		self.mode = this.input. readUint8 ();		
		
	}
}





class s2c_del_gm_rightfloat
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onDel_gm_rightfloat"; 
	private static input:ByteArray;		
	
	/**
	 * ID
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_del_gm_rightfloat, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//ID
		self.id = this.input. readUint32 ();		
		
	}
}





class both_sync_mstime_app
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onSync_mstime_app"; 
	private static input:ByteArray;		
	
	/**
	 * 服务器运行的毫秒数
	 */
	public mstime_now :number ;	//uint32		
	/**
	 * 自然时间
	 */
	public time_now :number ;	//uint32		
	/**
	 * 自然时间的服务器启动时间
	 */
	public open_time :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_sync_mstime_app, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//服务器运行的毫秒数
		self.mstime_now = this.input. readUint32 ();		
		
		//自然时间
		self.time_now = this.input. readUint32 ();		
		
		//自然时间的服务器启动时间
		self.open_time = this.input. readUint32 ();		
		
	}
}





class c2s_open_window
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onOpen_window"; 
	private static input:ByteArray;		
	
	/**
	 * 窗口类型
	 */
	public window_type :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_open_window, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//窗口类型
		self.window_type = this.input. readUint32 ();		
		
	}
}





class c2s_player_gag
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onPlayer_gag"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家ID
	 */
	public player_id :string ;	//String		
	/**
	 * 结束时间
	 */
	public end_time :number ;	//uint32		
	/**
	 * 禁言理由
	 */
	public content :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_player_gag, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家ID
		self.player_id = this.input. readString ();		
		
		//结束时间
		self.end_time = this.input. readUint32 ();		
		
		//禁言理由
		self.content = this.input. readString ();		
		
	}
}





class c2s_player_kicking
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPlayer_kicking"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家ID
	 */
	public player_id :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_player_kicking, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家ID
		self.player_id = this.input. readString ();		
		
	}
}





class s2c_merge_server_msg
{				
	public optcode:number = 0;
	public static param_count:number = 6;
	public static optname:string = "onMerge_server_msg"; 
	private static input:ByteArray;		
	
	/**
	 * 合服域名
	 */
	public merge_host :string ;	//String		
	/**
	 * 合服端口
	 */
	public merge_port :number ;	//uint32		
	/**
	 * 合服sessionkey
	 */
	public merge_key :string ;	//String		
	/**
	 * 合服类型
	 */
	public merge_type :number ;	//uint32		
	/**
	 * 预留
	 */
	public reserve :number ;	//uint32		
	/**
	 * 预留2
	 */
	public reserve2 :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_merge_server_msg, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//合服域名
		self.merge_host = this.input. readString ();		
		
		//合服端口
		self.merge_port = this.input. readUint32 ();		
		
		//合服sessionkey
		self.merge_key = this.input. readString ();		
		
		//合服类型
		self.merge_type = this.input. readUint32 ();		
		
		//预留
		self.reserve = this.input. readUint32 ();		
		
		//预留2
		self.reserve2 = this.input. readUint32 ();		
		
	}
}





class c2s_rank_list_query
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onRank_list_query"; 
	private static input:ByteArray;		
	
	/**
	 * 回调号
	 */
	public call_back_id :number ;	//uint32		
	/**
	 * 排行类型
	 */
	public rank_list_type :number ;	//uint8		
	/**
	 * 开始
	 */
	public start_index :number ;	//uint16		
	/**
	 * 结束
	 */
	public end_index :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_rank_list_query, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//回调号
		self.call_back_id = this.input. readUint32 ();		
		
		//排行类型
		self.rank_list_type = this.input. readUint8 ();		
		
		//开始
		self.start_index = this.input. readUint16 ();		
		
		//结束
		self.end_index = this.input. readUint16 ();		
		
	}
}





class s2c_rank_list_query_result
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onRank_list_query_result"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_rank_list_query_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_client_update_scened
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onClient_update_scened"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_client_update_scened, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_num_lua
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onNum_lua"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_num_lua, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_loot_select
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onLoot_select"; 
	private static input:ByteArray;		
	
	/**
	 * x
	 */
	public x :number ;	//uint16		
	/**
	 * y
	 */
	public y :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_loot_select, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//x
		self.x = this.input. readUint16 ();		
		
		//y
		self.y = this.input. readUint16 ();		
		
	}
}





class c2s_goback_to_game_server
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGoback_to_game_server"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_goback_to_game_server, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_world_war_CS_player_info
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onWorld_war_CS_player_info"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_world_war_CS_player_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_join_or_leave_server
{				
	public optcode:number = 0;
	public static param_count:number = 5;
	public static optname:string = "onJoin_or_leave_server"; 
	private static input:ByteArray;		
	
	/**
	 * 加入或者离开
	 */
	public join_or_leave :number ;	//uint8		
	/**
	 * 服务器类型
	 */
	public server_type :number ;	//uint8		
	/**
	 * 服务器进程id
	 */
	public server_pid :number ;	//uint32		
	/**
	 * 服务器连接id
	 */
	public server_fd :number ;	//uint32		
	/**
	 * 加入或者离开的时间点
	 */
	public time :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_join_or_leave_server, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//加入或者离开
		self.join_or_leave = this.input. readUint8 ();		
		
		//服务器类型
		self.server_type = this.input. readUint8 ();		
		
		//服务器进程id
		self.server_pid = this.input. readUint32 ();		
		
		//服务器连接id
		self.server_fd = this.input. readUint32 ();		
		
		//加入或者离开的时间点
		self.time = this.input. readUint32 ();		
		
	}
}





class both_world_war_SC_player_info
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onWorld_war_SC_player_info"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_world_war_SC_player_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class both_clientSubscription
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onClientSubscription"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家guid
	 */
	public guid :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_clientSubscription, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家guid
		self.guid = this.input. readUint32 ();		
		
	}
}





class s2c_lua_script
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onLua_script"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_lua_script, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_char_update_info
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onChar_update_info"; 
	private static input:ByteArray;		
	
	/**
	 * 角色更改信息
	 */
	public info :char_create_info  ;	//char_create_info		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_char_update_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//角色更改信息
		self.info = new char_create_info;
		self.info .read(this.input);
		
	}
}





class s2c_notice_watcher_map_info
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onNotice_watcher_map_info"; 
	private static input:ByteArray;		
	
	/**
	 * 观察者guid
	 */
	public wather_guid :string ;	//String		
	/**
	 * 地图id
	 */
	public map_id :number ;	//uint32		
	/**
	 * 实例id
	 */
	public instance_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_notice_watcher_map_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//观察者guid
		self.wather_guid = this.input. readString ();		
		
		//地图id
		self.map_id = this.input. readUint32 ();		
		
		//实例id
		self.instance_id = this.input. readUint32 ();		
		
	}
}





class c2s_modify_watch
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onModify_watch"; 
	private static input:ByteArray;		
	
	/**
	 * 操作类型
	 */
	public opt :number ;	//uint8		
	/**
	 * 修改对象订阅
	 */
	public cid :number ;	//uint32		
	/**
	 * 订阅key
	 */
	public key :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_modify_watch, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//操作类型
		self.opt = this.input. readUint8 ();		
		
		//修改对象订阅
		self.cid = this.input. readUint32 ();		
		
		//订阅key
		self.key = this.input. readString ();		
		
	}
}





class c2s_kuafu_chuansong
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onKuafu_chuansong"; 
	private static input:ByteArray;		
	
	/**
	 * 战斗信息
	 */
	public str_data :string ;	//String		
	/**
	 * 观察者guid
	 */
	public watcher_guid :string ;	//String		
	/**
	 * 预留参数
	 */
	public reserve :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_kuafu_chuansong, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//战斗信息
		self.str_data = this.input. readString ();		
		
		//观察者guid
		self.watcher_guid = this.input. readString ();		
		
		//预留参数
		self.reserve = this.input. readUint32 ();		
		
	}
}





class c2s_show_suit
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onShow_suit"; 
	private static input:ByteArray;		
	
	/**
	 * 主背包位置
	 */
	public position :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_show_suit, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//主背包位置
		self.position = this.input. readUint8 ();		
		
	}
}





class c2s_show_position
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onShow_position"; 
	private static input:ByteArray;		
	
	/**
	 * 频道id
	 */
	public channel :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_show_position, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//频道id
		self.channel = this.input. readUint8 ();		
		
	}
}





class c2s_gold_respawn
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGold_respawn"; 
	private static input:ByteArray;		
	
	/**
	 * 是否使用元宝
	 */
	public useGold :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_gold_respawn, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//是否使用元宝
		self.useGold = this.input. readUint8 ();		
		
	}
}





class s2c_field_death_cooldown
{				
	public optcode:number = 0;
	public static param_count:number = 5;
	public static optname:string = "onField_death_cooldown"; 
	private static input:ByteArray;		
	
	/**
	 * 原地复活类型&0:元宝&1:时间戳
	 */
	public type :number ;	//uint8		
	/**
	 * 时间戳或者元宝值
	 */
	public value :number ;	//uint32		
	/**
	 * 杀人者名字
	 */
	public killername :string ;	//String		
	/**
	 * 自动复活倒计时
	 */
	public cooldown :number ;	//uint16		
	/**
	 * 参数
	 */
	public params :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_field_death_cooldown, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//原地复活类型&0:元宝&1:时间戳
		self.type = this.input. readUint8 ();		
		
		//时间戳或者元宝值
		self.value = this.input. readUint32 ();		
		
		//杀人者名字
		self.killername = this.input. readString ();		
		
		//自动复活倒计时
		self.cooldown = this.input. readUint16 ();		
		
		//参数
		self.params = this.input. readString ();		
		
	}
}





class c2s_mall_buy
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onMall_buy"; 
	private static input:ByteArray;		
	
	/**
	 * 商品序列号
	 */
	public id :number ;	//uint32		
	/**
	 * 商品数量
	 */
	public count :number ;	//uint32		
	/**
	 * 时效ID
	 */
	public time :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_mall_buy, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//商品序列号
		self.id = this.input. readUint32 ();		
		
		//商品数量
		self.count = this.input. readUint32 ();		
		
		//时效ID
		self.time = this.input. readUint32 ();		
		
	}
}





class c2s_strength
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onStrength"; 
	private static input:ByteArray;		
	
	/**
	 * 强化的位置
	 */
	public part :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_strength, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//强化的位置
		self.part = this.input. readUint8 ();		
		
	}
}





class s2c_strength_success
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onStrength_success"; 
	private static input:ByteArray;		
	
	/**
	 * 当前强化等级
	 */
	public level :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_strength_success, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//当前强化等级
		self.level = this.input. readUint16 ();		
		
	}
}





class c2s_forceInto
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onForceInto"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_forceInto, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_create_faction
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onCreate_faction"; 
	private static input:ByteArray;		
	
	/**
	 * 帮派名称
	 */
	public name :string ;	//String		
	/**
	 * icon
	 */
	public icon :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_create_faction, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//帮派名称
		self.name = this.input. readString ();		
		
		//icon
		self.icon = this.input. readUint8 ();		
		
	}
}





class c2s_faction_upgrade
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onFaction_upgrade"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_faction_upgrade, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_faction_join
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onFaction_join"; 
	private static input:ByteArray;		
	
	/**
	 * 帮派guid
	 */
	public id :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_faction_join, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//帮派guid
		self.id = this.input. readString ();		
		
	}
}





class c2s_raise_base_spell
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onRaise_base_spell"; 
	private static input:ByteArray;		
	
	/**
	 * 技能类型
	 */
	public raiseType :number ;	//uint8		
	/**
	 * 技能ID
	 */
	public spellId :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_raise_base_spell, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//技能类型
		self.raiseType = this.input. readUint8 ();		
		
		//技能ID
		self.spellId = this.input. readUint16 ();		
		
	}
}





class c2s_upgrade_anger_spell
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onUpgrade_anger_spell"; 
	private static input:ByteArray;		
	
	/**
	 * 技能ID
	 */
	public spellId :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_upgrade_anger_spell, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//技能ID
		self.spellId = this.input. readUint16 ();		
		
	}
}





class c2s_raise_mount
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onRaise_mount"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_raise_mount, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_upgrade_mount
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onUpgrade_mount"; 
	private static input:ByteArray;		
	
	/**
	 * 是否自动使用道具
	 */
	public useItem :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_upgrade_mount, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//是否自动使用道具
		self.useItem = this.input. readUint8 ();		
		
	}
}





class c2s_upgrade_mount_one_step
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onUpgrade_mount_one_step"; 
	private static input:ByteArray;		
	
	/**
	 * 是否自动使用道具
	 */
	public useItem :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_upgrade_mount_one_step, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//是否自动使用道具
		self.useItem = this.input. readUint8 ();		
		
	}
}





class c2s_illusion_mount_active
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onIllusion_mount_active"; 
	private static input:ByteArray;		
	
	/**
	 * 幻化坐骑ID
	 */
	public illuId :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_illusion_mount_active, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//幻化坐骑ID
		self.illuId = this.input. readUint16 ();		
		
	}
}





class c2s_illusion_mount
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onIllusion_mount"; 
	private static input:ByteArray;		
	
	/**
	 * 幻化坐骑ID
	 */
	public illuId :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_illusion_mount, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//幻化坐骑ID
		self.illuId = this.input. readUint16 ();		
		
	}
}





class c2s_ride_mount
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onRide_mount"; 
	private static input:ByteArray;		
	
	/**
	 * 1:上&0:下
	 */
	public oper :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_ride_mount, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//1:上&0:下
		self.oper = this.input. readUint8 ();		
		
	}
}





class s2c_grid_unit_jump
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGrid_unit_jump"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_grid_unit_jump, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_gem
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGem"; 
	private static input:ByteArray;		
	
	/**
	 * 宝石位置
	 */
	public part :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_gem, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//宝石位置
		self.part = this.input. readUint8 ();		
		
	}
}





class c2s_change_battle_mode
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onChange_battle_mode"; 
	private static input:ByteArray;		
	
	/**
	 * 需要切换的模式
	 */
	public mode :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_change_battle_mode, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//需要切换的模式
		self.mode = this.input. readUint8 ();		
		
	}
}





class s2c_peace_mode_cd
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPeace_mode_cd"; 
	private static input:ByteArray;		
	
	/**
	 * 和平模式CD
	 */
	public mode :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_peace_mode_cd, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//和平模式CD
		self.mode = this.input. readUint8 ();		
		
	}
}





class c2s_divine_active
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onDivine_active"; 
	private static input:ByteArray;		
	
	/**
	 * 神兵ID
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_divine_active, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//神兵ID
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_divine_uplev
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onDivine_uplev"; 
	private static input:ByteArray;		
	
	/**
	 * 神兵ID
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_divine_uplev, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//神兵ID
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_divine_switch
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onDivine_switch"; 
	private static input:ByteArray;		
	
	/**
	 * 神兵ID
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_divine_switch, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//神兵ID
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_jump_start
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onJump_start"; 
	private static input:ByteArray;		
	
	/**
	 * 坐标x
	 */
	public pos_x :number ;	//uint16		
	/**
	 * 坐标x
	 */
	public pos_y :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_jump_start, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//坐标x
		self.pos_x = this.input. readUint16 ();		
		
		//坐标x
		self.pos_y = this.input. readUint16 ();		
		
	}
}





class c2s_enter_vip_instance
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onEnter_vip_instance"; 
	private static input:ByteArray;		
	
	/**
	 * vip副本序号id
	 */
	public id :number ;	//uint16		
	/**
	 * vip副本难度
	 */
	public hard :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_enter_vip_instance, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//vip副本序号id
		self.id = this.input. readUint16 ();		
		
		//vip副本难度
		self.hard = this.input. readUint8 ();		
		
	}
}





class c2s_sweep_vip_instance
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSweep_vip_instance"; 
	private static input:ByteArray;		
	
	/**
	 * vip副本序号id
	 */
	public id :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_sweep_vip_instance, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//vip副本序号id
		self.id = this.input. readUint16 ();		
		
	}
}





class c2s_hang_up
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onHang_up"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_hang_up, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_hang_up_setting
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onHang_up_setting"; 
	private static input:ByteArray;		
	
	/**
	 * 同PLAYER_FIELD_HOOK_BYTE0
	 */
	public value0 :number ;	//uint32		
	/**
	 * 同PLAYER_FIELD_HOOK_BYTE1
	 */
	public value1 :number ;	//uint32		
	/**
	 * 同PLAYER_FIELD_HOOK_BYTE2
	 */
	public value2 :number ;	//uint32		
	/**
	 * 同PLAYER_FIELD_HOOK_BYTE3
	 */
	public value3 :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_hang_up_setting, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//同PLAYER_FIELD_HOOK_BYTE0
		self.value0 = this.input. readUint32 ();		
		
		//同PLAYER_FIELD_HOOK_BYTE1
		self.value1 = this.input. readUint32 ();		
		
		//同PLAYER_FIELD_HOOK_BYTE2
		self.value2 = this.input. readUint32 ();		
		
		//同PLAYER_FIELD_HOOK_BYTE3
		self.value3 = this.input. readUint32 ();		
		
	}
}





class c2s_enter_trial_instance
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onEnter_trial_instance"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_enter_trial_instance, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_sweep_trial_instance
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onSweep_trial_instance"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_sweep_trial_instance, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_reset_trial_instance
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onReset_trial_instance"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_reset_trial_instance, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_sweep_instance_reward
{				
	public optcode:number = 0;
	public static param_count:number = 5;
	public static optname:string = "onSweep_instance_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 扫荡副本子类型
	 */
	public inst_sub_type :number ;	//uint8		
	/**
	 * 扫荡副本数据1
	 */
	public data1 :number ;	//uint8		
	/**
	 * 扫荡副本数据2
	 */
	public data2 :number ;	//uint8		
	/**
	 * 扫荡副本数据3
	 */
	public data3 :number ;	//uint8		
	/**
	 * 道具列表
	 */
	public list :Array<item_reward_info > = new Array(); //item_reward_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_sweep_instance_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//扫荡副本子类型
		self.inst_sub_type = this.input. readUint8 ();		
		
		//扫荡副本数据1
		self.data1 = this.input. readUint8 ();		
		
		//扫荡副本数据2
		self.data2 = this.input. readUint8 ();		
		
		//扫荡副本数据3
		self.data3 = this.input. readUint8 ();		
		
		//道具列表
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:item_reward_info = new item_reward_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class c2s_reenter_instance
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onReenter_instance"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_reenter_instance, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_merry_go_round
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onMerry_go_round"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_merry_go_round, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_social_add_friend
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSocial_add_friend"; 
	private static input:ByteArray;		
	
	/**
	 * 好友GUID
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_social_add_friend, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//好友GUID
		self.guid = this.input. readString ();		
		
	}
}





class c2s_social_sureadd_friend
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSocial_sureadd_friend"; 
	private static input:ByteArray;		
	
	/**
	 * 好友GUID
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_social_sureadd_friend, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//好友GUID
		self.guid = this.input. readString ();		
		
	}
}





class c2s_social_gift_friend
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onSocial_gift_friend"; 
	private static input:ByteArray;		
	
	/**
	 * 好友GUID
	 */
	public guid :string ;	//String		
	/**
	 * 礼物列表
	 */
	public gift :Array<item_reward_info > = new Array(); //item_reward_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_social_gift_friend, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//好友GUID
		self.guid = this.input. readString ();		
		
		//礼物列表
		if( self.gift .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _gift:item_reward_info = new item_reward_info;
			_gift .read(this.input);
			self.gift .push(_gift);
		}
		
	}
}





class c2s_social_recommend_friend
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onSocial_recommend_friend"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_social_recommend_friend, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_social_get_recommend_friend
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSocial_get_recommend_friend"; 
	private static input:ByteArray;		
	
	/**
	 * 好友列表
	 */
	public list :Array<social_friend_info > = new Array(); //social_friend_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_social_get_recommend_friend, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//好友列表
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:social_friend_info = new social_friend_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class c2s_social_revenge_enemy
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSocial_revenge_enemy"; 
	private static input:ByteArray;		
	
	/**
	 * 仇人GUID
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_social_revenge_enemy, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//仇人GUID
		self.guid = this.input. readString ();		
		
	}
}





class c2s_social_del_friend
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSocial_del_friend"; 
	private static input:ByteArray;		
	
	/**
	 * 好友GUID
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_social_del_friend, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//好友GUID
		self.guid = this.input. readString ();		
		
	}
}





class c2s_teleport_main_city
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onTeleport_main_city"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_teleport_main_city, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_chat_by_channel
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onChat_by_channel"; 
	private static input:ByteArray;		
	
	/**
	 * 聊天频道
	 */
	public channel :number ;	//uint8		
	/**
	 * 说话内容
	 */
	public content :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_chat_by_channel, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//聊天频道
		self.channel = this.input. readUint8 ();		
		
		//说话内容
		self.content = this.input. readString ();		
		
	}
}





class s2c_send_chat
{				
	public optcode:number = 0;
	public static param_count:number = 11;
	public static optname:string = "onSend_chat"; 
	private static input:ByteArray;		
	
	/**
	 * 聊天频道
	 */
	public channel :number ;	//uint8		
	/**
	 * 玩家guid
	 */
	public guid :string ;	//String		
	/**
	 * 称号
	 */
	public title :number ;	//uint8		
	/**
	 * 名字
	 */
	public name :string ;	//String		
	/**
	 * VIP
	 */
	public vip :number ;	//uint8		
	/**
	 * 转生
	 */
	public zs :number ;	//uint8		
	/**
	 * 等级
	 */
	public lvl :number ;	//uint8		
	/**
	 * 头像
	 */
	public gender :number ;	//uint8		
	/**
	 * 说话内容
	 */
	public content :string ;	//String		
	/**
	 * 收到的guid
	 */
	public to_guid :string ;	//String		
	/**
	 * 帮派guid
	 */
	public faction_guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_send_chat, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//聊天频道
		self.channel = this.input. readUint8 ();		
		
		//玩家guid
		self.guid = this.input. readString ();		
		
		//称号
		self.title = this.input. readUint8 ();		
		
		//名字
		self.name = this.input. readString ();		
		
		//VIP
		self.vip = this.input. readUint8 ();		
		
		//转生
		self.zs = this.input. readUint8 ();		
		
		//等级
		self.lvl = this.input. readUint8 ();		
		
		//头像
		self.gender = this.input. readUint8 ();		
		
		//说话内容
		self.content = this.input. readString ();		
		
		//收到的guid
		self.to_guid = this.input. readString ();		
		
		//帮派guid
		self.faction_guid = this.input. readString ();		
		
	}
}





class c2s_social_clear_apply
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onSocial_clear_apply"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_social_clear_apply, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_msg_decline
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onMsg_decline"; 
	private static input:ByteArray;		
	
	/**
	 * PLAYER_FIELD_DECLINE_CHANNEL_BYTE0
	 */
	public value0 :number ;	//uint32		
	/**
	 * PLAYER_FIELD_DECLINE_CHANNEL_BYTE1
	 */
	public value1 :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_msg_decline, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//PLAYER_FIELD_DECLINE_CHANNEL_BYTE0
		self.value0 = this.input. readUint32 ();		
		
		//PLAYER_FIELD_DECLINE_CHANNEL_BYTE1
		self.value1 = this.input. readUint32 ();		
		
	}
}





class s2c_faction_get_list_result
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onFaction_get_list_result"; 
	private static input:ByteArray;		
	
	/**
	 * 帮派列表
	 */
	public list :Array<faction_info > = new Array(); //faction_info
	/**
	 * 当前页
	 */
	public curpag :number ;	//uint8		
	/**
	 * 最大页
	 */
	public maxpag :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_faction_get_list_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//帮派列表
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:faction_info = new faction_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
		//当前页
		self.curpag = this.input. readUint8 ();		
		
		//最大页
		self.maxpag = this.input. readUint8 ();		
		
	}
}





class c2s_faction_getlist
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onFaction_getlist"; 
	private static input:ByteArray;		
	
	/**
	 * 当前页
	 */
	public page :number ;	//uint8		
	/**
	 * 每页数量
	 */
	public num :number ;	//uint8		
	/**
	 * 自动过滤
	 */
	public grep :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_faction_getlist, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//当前页
		self.page = this.input. readUint8 ();		
		
		//每页数量
		self.num = this.input. readUint8 ();		
		
		//自动过滤
		self.grep = this.input. readUint8 ();		
		
	}
}





class c2s_faction_manager
{				
	public optcode:number = 0;
	public static param_count:number = 5;
	public static optname:string = "onFaction_manager"; 
	private static input:ByteArray;		
	
	/**
	 * 操作类型
	 */
	public opt_type :number ;	//uint8		
	/**
	 * 预留int值1
	 */
	public reserve_int1 :number ;	//uint16		
	/**
	 * 预留int值2
	 */
	public reserve_int2 :number ;	//uint16		
	/**
	 * 预留string值1
	 */
	public reserve_str1 :string ;	//String		
	/**
	 * 预留string值2
	 */
	public reserve_str2 :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_faction_manager, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//操作类型
		self.opt_type = this.input. readUint8 ();		
		
		//预留int值1
		self.reserve_int1 = this.input. readUint16 ();		
		
		//预留int值2
		self.reserve_int2 = this.input. readUint16 ();		
		
		//预留string值1
		self.reserve_str1 = this.input. readString ();		
		
		//预留string值2
		self.reserve_str2 = this.input. readString ();		
		
	}
}





class c2s_faction_member_operate
{				
	public optcode:number = 0;
	public static param_count:number = 5;
	public static optname:string = "onFaction_member_operate"; 
	private static input:ByteArray;		
	
	/**
	 * 操作类型
	 */
	public opt_type :number ;	//uint8		
	/**
	 * 预留int值1
	 */
	public reserve_int1 :number ;	//uint16		
	/**
	 * 预留int值2
	 */
	public reserve_int2 :number ;	//uint16		
	/**
	 * 预留string值1
	 */
	public reserve_str1 :string ;	//String		
	/**
	 * 预留string值2
	 */
	public reserve_str2 :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_faction_member_operate, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//操作类型
		self.opt_type = this.input. readUint8 ();		
		
		//预留int值1
		self.reserve_int1 = this.input. readUint16 ();		
		
		//预留int值2
		self.reserve_int2 = this.input. readUint16 ();		
		
		//预留string值1
		self.reserve_str1 = this.input. readString ();		
		
		//预留string值2
		self.reserve_str2 = this.input. readString ();		
		
	}
}





class c2s_faction_fast_join
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onFaction_fast_join"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_faction_fast_join, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_social_add_friend_byname
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSocial_add_friend_byname"; 
	private static input:ByteArray;		
	
	/**
	 * 好友name
	 */
	public name :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_social_add_friend_byname, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//好友name
		self.name = this.input. readString ();		
		
	}
}





class c2s_read_mail
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onRead_mail"; 
	private static input:ByteArray;		
	
	/**
	 * 邮件索引
	 */
	public indx :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_read_mail, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//邮件索引
		self.indx = this.input. readUint16 ();		
		
	}
}





class c2s_pick_mail
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPick_mail"; 
	private static input:ByteArray;		
	
	/**
	 * 邮件索引
	 */
	public indx :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_mail, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//邮件索引
		self.indx = this.input. readUint16 ();		
		
	}
}





class c2s_remove_mail
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onRemove_mail"; 
	private static input:ByteArray;		
	
	/**
	 * 邮件索引
	 */
	public indx :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_remove_mail, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//邮件索引
		self.indx = this.input. readUint16 ();		
		
	}
}





class c2s_pick_mail_one_step
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onPick_mail_one_step"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_mail_one_step, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_remove_mail_one_step
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onRemove_mail_one_step"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_remove_mail_one_step, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_block_chat
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onBlock_chat"; 
	private static input:ByteArray;		
	
	/**
	 * 人物guid
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_block_chat, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//人物guid
		self.guid = this.input. readString ();		
		
	}
}





class c2s_cancel_block_chat
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onCancel_block_chat"; 
	private static input:ByteArray;		
	
	/**
	 * 索引
	 */
	public indx :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_cancel_block_chat, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//索引
		self.indx = this.input. readUint8 ();		
		
	}
}





class c2s_use_broadcast_gameobject
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onUse_broadcast_gameobject"; 
	private static input:ByteArray;		
	
	/**
	 * gameobject uintguid
	 */
	public target :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_use_broadcast_gameobject, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//gameobject uintguid
		self.target = this.input. readUint32 ();		
		
	}
}





class c2s_world_boss_enroll
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onWorld_boss_enroll"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_world_boss_enroll, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_world_boss_fight
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onWorld_boss_fight"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_world_boss_fight, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_change_line
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onChange_line"; 
	private static input:ByteArray;		
	
	/**
	 * 线号
	 */
	public lineNo :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_change_line, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//线号
		self.lineNo = this.input. readUint32 ();		
		
	}
}





class c2s_roll_world_boss_treasure
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onRoll_world_boss_treasure"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_roll_world_boss_treasure, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_roll_result
{				
	public optcode:number = 0;
	public static param_count:number = 5;
	public static optname:string = "onRoll_result"; 
	private static input:ByteArray;		
	
	/**
	 * 数值点
	 */
	public point :number ;	//uint8		
	/**
	 * 名字
	 */
	public name :string ;	//String		
	/**
	 * 是否当前最高
	 */
	public isHighest :number ;	//uint8		
	/**
	 * 服务器结束roll点时间戳
	 */
	public timestamp :number ;	//uint32		
	/**
	 * rollid
	 */
	public rollid :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_roll_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//数值点
		self.point = this.input. readUint8 ();		
		
		//名字
		self.name = this.input. readString ();		
		
		//是否当前最高
		self.isHighest = this.input. readUint8 ();		
		
		//服务器结束roll点时间戳
		self.timestamp = this.input. readUint32 ();		
		
		//rollid
		self.rollid = this.input. readUint8 ();		
		
	}
}





class s2c_boss_rank
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onBoss_rank"; 
	private static input:ByteArray;		
	
	/**
	 * boss类型
	 */
	public rankType :number ;	//uint8		
	/**
	 * 排名
	 */
	public rankList :Array<rank_info > = new Array(); //rank_info
	/**
	 * 我的排名
	 */
	public mine :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_boss_rank, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//boss类型
		self.rankType = this.input. readUint8 ();		
		
		//排名
		if( self.rankList .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _rankList:rank_info = new rank_info;
			_rankList .read(this.input);
			self.rankList .push(_rankList);
		}
		
		//我的排名
		self.mine = this.input. readUint8 ();		
		
	}
}





class c2s_rank_add_like
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onRank_add_like"; 
	private static input:ByteArray;		
	
	/**
	 * 排行榜类型
	 */
	public type :number ;	//uint8		
	/**
	 * GUID
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_rank_add_like, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//排行榜类型
		self.type = this.input. readUint8 ();		
		
		//GUID
		self.guid = this.input. readString ();		
		
	}
}





class s2c_rank_add_like_result
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onRank_add_like_result"; 
	private static input:ByteArray;		
	
	/**
	 * 排行榜类型
	 */
	public type :number ;	//uint8		
	/**
	 * GUID
	 */
	public guid :string ;	//String		
	/**
	 * like
	 */
	public num :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_rank_add_like_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//排行榜类型
		self.type = this.input. readUint8 ();		
		
		//GUID
		self.guid = this.input. readString ();		
		
		//like
		self.num = this.input. readUint32 ();		
		
	}
}





class c2s_res_instance_enter
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onRes_instance_enter"; 
	private static input:ByteArray;		
	
	/**
	 * 副本类型
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_res_instance_enter, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//副本类型
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_res_instance_sweep
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onRes_instance_sweep"; 
	private static input:ByteArray;		
	
	/**
	 * 副本类型
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_res_instance_sweep, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//副本类型
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_show_map_line
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onShow_map_line"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_show_map_line, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_send_map_line
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSend_map_line"; 
	private static input:ByteArray;		
	
	/**
	 * 分线号信息
	 */
	public info :Array<line_info > = new Array(); //line_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_send_map_line, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//分线号信息
		if( self.info .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _info:line_info = new line_info;
			_info .read(this.input);
			self.info .push(_info);
		}
		
	}
}





class s2c_item_notice
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onItem_notice"; 
	private static input:ByteArray;		
	
	/**
	 * 显示位置类型
	 */
	public showType :number ;	//uint8		
	/**
	 * 道具列表
	 */
	public list :Array<item_reward_info > = new Array(); //item_reward_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_item_notice, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//显示位置类型
		self.showType = this.input. readUint8 ();		
		
		//道具列表
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:item_reward_info = new item_reward_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class c2s_teleport_map
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onTeleport_map"; 
	private static input:ByteArray;		
	
	/**
	 * 地图id
	 */
	public mapid :number ;	//uint32		
	/**
	 * 分线号
	 */
	public lineNo :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_teleport_map, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//地图id
		self.mapid = this.input. readUint32 ();		
		
		//分线号
		self.lineNo = this.input. readUint32 ();		
		
	}
}





class c2s_teleport_field_boss
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onTeleport_field_boss"; 
	private static input:ByteArray;		
	
	/**
	 * 地图id
	 */
	public mapid :number ;	//uint32		
	/**
	 * 分线号
	 */
	public lineNo :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_teleport_field_boss, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//地图id
		self.mapid = this.input. readUint32 ();		
		
		//分线号
		self.lineNo = this.input. readUint32 ();		
		
	}
}





class c2s_get_activity_reward
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onGet_activity_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 礼包序号
	 */
	public id :number ;	//uint8		
	/**
	 * vip奖励
	 */
	public vip :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_activity_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//礼包序号
		self.id = this.input. readUint8 ();		
		
		//vip奖励
		self.vip = this.input. readUint8 ();		
		
	}
}





class c2s_get_achieve_reward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGet_achieve_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 成就序号
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_achieve_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//成就序号
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_get_achieve_all_reward
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGet_achieve_all_reward"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_achieve_all_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_set_title
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSet_title"; 
	private static input:ByteArray;		
	
	/**
	 * 称号序号
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_set_title, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//称号序号
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_init_title
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onInit_title"; 
	private static input:ByteArray;		
	
	/**
	 * 称号序号
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_init_title, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//称号序号
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_welfare_shouchong_reward
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onWelfare_shouchong_reward"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_welfare_shouchong_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_welfare_checkin
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onWelfare_checkin"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_welfare_checkin, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_welfare_checkin_all
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onWelfare_checkin_all"; 
	private static input:ByteArray;		
	
	/**
	 * 签到序号
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_welfare_checkin_all, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//签到序号
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_welfare_checkin_getback
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onWelfare_checkin_getback"; 
	private static input:ByteArray;		
	
	/**
	 * 签到序号
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_welfare_checkin_getback, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//签到序号
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_welfare_level
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onWelfare_level"; 
	private static input:ByteArray;		
	
	/**
	 * 等级序号
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_welfare_level, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//等级序号
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_welfare_active_getback
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onWelfare_active_getback"; 
	private static input:ByteArray;		
	
	/**
	 * 活动类型
	 */
	public id :number ;	//uint8		
	/**
	 * 完美找回
	 */
	public best :number ;	//uint8		
	/**
	 * 找回次数
	 */
	public num :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_welfare_active_getback, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//活动类型
		self.id = this.input. readUint8 ();		
		
		//完美找回
		self.best = this.input. readUint8 ();		
		
		//找回次数
		self.num = this.input. readUint16 ();		
		
	}
}





class c2s_pick_quest_reward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPick_quest_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 任务序号
	 */
	public indx :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_quest_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务序号
		self.indx = this.input. readUint8 ();		
		
	}
}





class c2s_talk_with_npc
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onTalk_with_npc"; 
	private static input:ByteArray;		
	
	/**
	 * npc uint guid
	 */
	public u_guid :number ;	//uint32		
	/**
	 * 任务id
	 */
	public questId :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_talk_with_npc, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//npc uint guid
		self.u_guid = this.input. readUint32 ();		
		
		//任务id
		self.questId = this.input. readUint16 ();		
		
	}
}





class c2s_use_virtual_item
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onUse_virtual_item"; 
	private static input:ByteArray;		
	
	/**
	 * itemid
	 */
	public entry :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_use_virtual_item, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//itemid
		self.entry = this.input. readUint16 ();		
		
	}
}





class c2s_pick_quest_chapter_reward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPick_quest_chapter_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 章节id
	 */
	public indx :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_quest_chapter_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//章节id
		self.indx = this.input. readUint8 ();		
		
	}
}





class c2s_kuafu_3v3_match
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onKuafu_3v3_match"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_kuafu_3v3_match, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_kuafu_match_start
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onKuafu_match_start"; 
	private static input:ByteArray;		
	
	/**
	 * 跨服类型
	 */
	public indx :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_kuafu_match_start, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//跨服类型
		self.indx = this.input. readUint8 ();		
		
	}
}





class c2s_kuafu_3v3_buytimes
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onKuafu_3v3_buytimes"; 
	private static input:ByteArray;		
	
	/**
	 * 购买次数
	 */
	public num :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_kuafu_3v3_buytimes, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//购买次数
		self.num = this.input. readUint8 ();		
		
	}
}





class c2s_kuafu_3v3_dayreward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onKuafu_3v3_dayreward"; 
	private static input:ByteArray;		
	
	/**
	 * 购买次数
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_kuafu_3v3_dayreward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//购买次数
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_kuafu_3v3_getranlist
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onKuafu_3v3_getranlist"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_kuafu_3v3_getranlist, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_kuafu_3v3_ranlist
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onKuafu_3v3_ranlist"; 
	private static input:ByteArray;		
	
	/**
	 * 列表
	 */
	public list :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_kuafu_3v3_ranlist, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//列表
		self.list = this.input. readString ();		
		
	}
}





class c2s_welfare_getalllist_getback
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onWelfare_getalllist_getback"; 
	private static input:ByteArray;		
	
	/**
	 * 完美找回
	 */
	public best :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_welfare_getalllist_getback, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//完美找回
		self.best = this.input. readUint8 ();		
		
	}
}





class s2c_welfare_rewardlist_getback
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onWelfare_rewardlist_getback"; 
	private static input:ByteArray;		
	
	/**
	 * 道具列表
	 */
	public list :string ;	//String		
	/**
	 * 消耗资源
	 */
	public cost :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_welfare_rewardlist_getback, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//道具列表
		self.list = this.input. readString ();		
		
		//消耗资源
		self.cost = this.input. readString ();		
		
	}
}





class c2s_welfare_getall_getback
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onWelfare_getall_getback"; 
	private static input:ByteArray;		
	
	/**
	 * 完美找回
	 */
	public best :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_welfare_getall_getback, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//完美找回
		self.best = this.input. readUint8 ();		
		
	}
}





class c2s_kuafu_3v3_getmyrank
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onKuafu_3v3_getmyrank"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_kuafu_3v3_getmyrank, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_kuafu_3v3_myrank
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onKuafu_3v3_myrank"; 
	private static input:ByteArray;		
	
	/**
	 * 名次
	 */
	public rank :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_kuafu_3v3_myrank, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//名次
		self.rank = this.input. readUint8 ();		
		
	}
}





class s2c_kuafu_3v3_kill_detail
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onKuafu_3v3_kill_detail"; 
	private static input:ByteArray;		
	
	/**
	 * 击杀者下标
	 */
	public indx1 :number ;	//uint32		
	/**
	 * 被击杀者下标
	 */
	public indx2 :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_kuafu_3v3_kill_detail, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//击杀者下标
		self.indx1 = this.input. readUint32 ();		
		
		//被击杀者下标
		self.indx2 = this.input. readUint32 ();		
		
	}
}





class s2c_kuafu_3v3_wait_info
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onKuafu_3v3_wait_info"; 
	private static input:ByteArray;		
	
	/**
	 * 匹配数据
	 */
	public list :Array<wait_info > = new Array(); //wait_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_kuafu_3v3_wait_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//匹配数据
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:wait_info = new wait_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class both_kuafu_3v3_cancel_match
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onKuafu_3v3_cancel_match"; 
	private static input:ByteArray;		
	
	/**
	 * 取消匹配跨服类型
	 */
	public type :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_kuafu_3v3_cancel_match, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//取消匹配跨服类型
		self.type = this.input. readUint32 ();		
		
	}
}





class c2s_kuafu_3v3_match_oper
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onKuafu_3v3_match_oper"; 
	private static input:ByteArray;		
	
	/**
	 * 0:取消& 1:接受
	 */
	public oper :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_kuafu_3v3_match_oper, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//0:取消& 1:接受
		self.oper = this.input. readUint32 ();		
		
	}
}





class s2c_kuafu_3v3_decline_match
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onKuafu_3v3_decline_match"; 
	private static input:ByteArray;		
	
	/**
	 * 拒绝匹配跨服类型
	 */
	public type :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_kuafu_3v3_decline_match, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//拒绝匹配跨服类型
		self.type = this.input. readUint32 ();		
		
	}
}





class c2s_kuafu_xianfu_match
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onKuafu_xianfu_match"; 
	private static input:ByteArray;		
	
	/**
	 * 仙府类型
	 */
	public indx :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_kuafu_xianfu_match, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//仙府类型
		self.indx = this.input. readUint8 ();		
		
	}
}





class s2c_kuafu_match_wait
{				
	public optcode:number = 0;
	public static param_count:number = 5;
	public static optname:string = "onKuafu_match_wait"; 
	private static input:ByteArray;		
	
	/**
	 * 匹配类型
	 */
	public type :number ;	//uint8		
	/**
	 * 需要匹配个数
	 */
	public target :number ;	//uint8		
	/**
	 * 当前匹配个数
	 */
	public count :number ;	//uint8		
	/**
	 * int参数
	 */
	public data :number ;	//uint32		
	/**
	 * str参数
	 */
	public params :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_kuafu_match_wait, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//匹配类型
		self.type = this.input. readUint8 ();		
		
		//需要匹配个数
		self.target = this.input. readUint8 ();		
		
		//当前匹配个数
		self.count = this.input. readUint8 ();		
		
		//int参数
		self.data = this.input. readUint32 ();		
		
		//str参数
		self.params = this.input. readString ();		
		
	}
}





class s2c_kuafu_xianfu_minimap_info
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onKuafu_xianfu_minimap_info"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_kuafu_xianfu_minimap_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_buy_xianfu_item
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onBuy_xianfu_item"; 
	private static input:ByteArray;		
	
	/**
	 * 仙府券类型
	 */
	public type :number ;	//uint8		
	/**
	 * 购买类型
	 */
	public indx :number ;	//uint8		
	/**
	 * 购买数量
	 */
	public count :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_buy_xianfu_item, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//仙府券类型
		self.type = this.input. readUint8 ();		
		
		//购买类型
		self.indx = this.input. readUint8 ();		
		
		//购买数量
		self.count = this.input. readUint16 ();		
		
	}
}





class c2s_xianfu_random_respawn
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onXianfu_random_respawn"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_xianfu_random_respawn, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_doujiantai_fight
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onDoujiantai_fight"; 
	private static input:ByteArray;		
	
	/**
	 * 排名
	 */
	public rank :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_doujiantai_fight, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//排名
		self.rank = this.input. readUint16 ();		
		
	}
}





class c2s_doujiantai_buytime
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onDoujiantai_buytime"; 
	private static input:ByteArray;		
	
	/**
	 * 排名
	 */
	public num :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_doujiantai_buytime, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//排名
		self.num = this.input. readUint8 ();		
		
	}
}





class c2s_doujiantai_clearcd
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onDoujiantai_clearcd"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_doujiantai_clearcd, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_doujiantai_first_reward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onDoujiantai_first_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 序号
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_doujiantai_first_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//序号
		self.id = this.input. readUint8 ();		
		
	}
}





class both_doujiantai_get_enemys_info
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onDoujiantai_get_enemys_info"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_doujiantai_get_enemys_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_doujiantai_get_rank
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onDoujiantai_get_rank"; 
	private static input:ByteArray;		
	
	/**
	 * 类型
	 */
	public startIdx :number ;	//uint16		
	/**
	 * 类型
	 */
	public endIdx :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_doujiantai_get_rank, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//类型
		self.startIdx = this.input. readUint16 ();		
		
		//类型
		self.endIdx = this.input. readUint16 ();		
		
	}
}





class c2s_doujiantai_refresh_enemys
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onDoujiantai_refresh_enemys"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_doujiantai_refresh_enemys, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class both_doujiantai_top3
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onDoujiantai_top3"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_doujiantai_top3, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class both_use_jump_point
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onUse_jump_point"; 
	private static input:ByteArray;		
	
	/**
	 * 跳点id
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:both_use_jump_point, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//跳点id
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_bag_item_sell
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onBag_item_sell"; 
	private static input:ByteArray;		
	
	/**
	 * 物品guid
	 */
	public item_guid :string ;	//String		
	/**
	 * 个数
	 */
	public count :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_bag_item_sell, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//物品guid
		self.item_guid = this.input. readString ();		
		
		//个数
		self.count = this.input. readUint32 ();		
		
	}
}





class c2s_bag_item_sort
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onBag_item_sort"; 
	private static input:ByteArray;		
	
	/**
	 * 背包类型
	 */
	public bag_type :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_bag_item_sort, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//背包类型
		self.bag_type = this.input. readUint32 ();		
		
	}
}





class c2s_submit_quest_daily2
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onSubmit_quest_daily2"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_submit_quest_daily2, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_attribute_changed
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onAttribute_changed"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_attribute_changed, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_bag_find_equip_better
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onBag_find_equip_better"; 
	private static input:ByteArray;		
	
	/**
	 * 物品id
	 */
	public item_id :number ;	//uint32		
	/**
	 * 背包位置
	 */
	public pos :number ;	//uint32		
	/**
	 * 物品战力
	 */
	public force :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_bag_find_equip_better, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//物品id
		self.item_id = this.input. readUint32 ();		
		
		//背包位置
		self.pos = this.input. readUint32 ();		
		
		//物品战力
		self.force = this.input. readUint32 ();		
		
	}
}





class s2c_module_active
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onModule_active"; 
	private static input:ByteArray;		
	
	/**
	 * 模块id
	 */
	public moduleId :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_module_active, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//模块id
		self.moduleId = this.input. readUint32 ();		
		
	}
}





class c2s_pick_daily2_quest_reward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPick_daily2_quest_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 任务序号
	 */
	public indx :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_daily2_quest_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务序号
		self.indx = this.input. readUint8 ();		
		
	}
}





class c2s_finish_now_guide
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onFinish_now_guide"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_finish_now_guide, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_get_cultivation_info
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGet_cultivation_info"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_cultivation_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_update_cultivation_info
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onUpdate_cultivation_info"; 
	private static input:ByteArray;		
	
	/**
	 * 修炼开始时间
	 */
	public start_time :number ;	//uint32		
	/**
	 * 宝箱掠夺信息
	 */
	public lost :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_update_cultivation_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//修炼开始时间
		self.start_time = this.input. readUint32 ();		
		
		//宝箱掠夺信息
		self.lost = this.input. readUint32 ();		
		
	}
}





class c2s_get_cultivation_rivals_info
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGet_cultivation_rivals_info"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_cultivation_rivals_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_update_cultivation_rivals_info_list
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onUpdate_cultivation_rivals_info_list"; 
	private static input:ByteArray;		
	
	/**
	 * 对手信息列表
	 */
	public list :Array<cultivation_rivals_info > = new Array(); //cultivation_rivals_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_update_cultivation_rivals_info_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//对手信息列表
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:cultivation_rivals_info = new cultivation_rivals_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class c2s_get_cultivation_reward
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGet_cultivation_reward"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_cultivation_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_refresh_cultivation_rivals
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onRefresh_cultivation_rivals"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_refresh_cultivation_rivals, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_plunder_cultivation_rival
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPlunder_cultivation_rival"; 
	private static input:ByteArray;		
	
	/**
	 * 对手序号
	 */
	public index :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_plunder_cultivation_rival, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//对手序号
		self.index = this.input. readUint32 ();		
		
	}
}





class c2s_revenge_cultivation_rival
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onRevenge_cultivation_rival"; 
	private static input:ByteArray;		
	
	/**
	 * 掠夺记录序号
	 */
	public index :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_revenge_cultivation_rival, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//掠夺记录序号
		self.index = this.input. readUint32 ();		
		
	}
}





class c2s_buy_cultivation_left_plunder_count
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onBuy_cultivation_left_plunder_count"; 
	private static input:ByteArray;		
	
	/**
	 * 购买数量
	 */
	public count :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_buy_cultivation_left_plunder_count, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//购买数量
		self.count = this.input. readUint32 ();		
		
	}
}





class s2c_show_cultivation_result_list
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onShow_cultivation_result_list"; 
	private static input:ByteArray;		
	
	/**
	 * 战斗结果-1:失败  1:胜利
	 */
	public result :number ;	//int32		
	/**
	 * 对方名称
	 */
	public name :string ;	//String		
	/**
	 * 
	 */
	public list :Array<item_reward_info > = new Array(); //item_reward_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_cultivation_result_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//战斗结果-1:失败  1:胜利
		self.result = this.input. readInt32 ();		
		
		//对方名称
		self.name = this.input. readString ();		
		
		//
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:item_reward_info = new item_reward_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class c2s_get_login_activity_reward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGet_login_activity_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 奖励id
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_login_activity_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//奖励id
		self.id = this.input. readUint32 ();		
		
	}
}





class s2c_cast_spell_start
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onCast_spell_start"; 
	private static input:ByteArray;		
	
	/**
	 * 释放玩家
	 */
	public caster_guid :number ;	//uint32		
	/**
	 * 攻击玩家
	 */
	public target_guid :number ;	//uint32		
	/**
	 * 技能id
	 */
	public spellid :number ;	//uint16		
	/**
	 * 参数
	 */
	public data :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_cast_spell_start, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//释放玩家
		self.caster_guid = this.input. readUint32 ();		
		
		//攻击玩家
		self.target_guid = this.input. readUint32 ();		
		
		//技能id
		self.spellid = this.input. readUint16 ();		
		
		//参数
		self.data = this.input. readString ();		
		
	}
}





class c2s_finish_optional_guide_step
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onFinish_optional_guide_step"; 
	private static input:ByteArray;		
	
	/**
	 * 引导id
	 */
	public guide_id :number ;	//uint32		
	/**
	 * 引导分步骤
	 */
	public step :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_finish_optional_guide_step, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//引导id
		self.guide_id = this.input. readUint32 ();		
		
		//引导分步骤
		self.step = this.input. readUint8 ();		
		
	}
}





class c2s_execute_quest_cmd_after_accepted
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onExecute_quest_cmd_after_accepted"; 
	private static input:ByteArray;		
	
	/**
	 * 任务序号下标
	 */
	public indx :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_execute_quest_cmd_after_accepted, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//任务序号下标
		self.indx = this.input. readUint16 ();		
		
	}
}





class s2c_show_unit_attribute
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onShow_unit_attribute"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_unit_attribute, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_back_to_famity
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onBack_to_famity"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_back_to_famity, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_faction_boss_send_result
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onFaction_boss_send_result"; 
	private static input:ByteArray;		
	
	/**
	 * 结果标识
	 */
	public result :number ;	//uint32		
	/**
	 * bossId
	 */
	public boss_id :number ;	//uint32		
	/**
	 * 家族资金变化量
	 */
	public money :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_faction_boss_send_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//结果标识
		self.result = this.input. readUint32 ();		
		
		//bossId
		self.boss_id = this.input. readUint32 ();		
		
		//家族资金变化量
		self.money = this.input. readUint32 ();		
		
	}
}





class c2s_challange_boss
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onChallange_boss"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_challange_boss, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_pick_offline_reward
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onPick_offline_reward"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_offline_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_offline_reward_result
{				
	public optcode:number = 0;
	public static param_count:number = 6;
	public static optname:string = "onOffline_reward_result"; 
	private static input:ByteArray;		
	
	/**
	 * 备用
	 */
	public reserve :number ;	//uint32		
	/**
	 * 备用2
	 */
	public reserve2 :number ;	//uint32		
	/**
	 * 备用3
	 */
	public reserve3 :number ;	//uint32		
	/**
	 * 备用4
	 */
	public reserve4 :number ;	//uint32		
	/**
	 * 备用5
	 */
	public reserve5 :number ;	//uint32		
	/**
	 * 
	 */
	public list :Array<item_reward_info > = new Array(); //item_reward_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_offline_reward_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//备用
		self.reserve = this.input. readUint32 ();		
		
		//备用2
		self.reserve2 = this.input. readUint32 ();		
		
		//备用3
		self.reserve3 = this.input. readUint32 ();		
		
		//备用4
		self.reserve4 = this.input. readUint32 ();		
		
		//备用5
		self.reserve5 = this.input. readUint32 ();		
		
		//
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:item_reward_info = new item_reward_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class c2s_smelting_equip
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSmelting_equip"; 
	private static input:ByteArray;		
	
	/**
	 * 装备pos 用竖线隔开
	 */
	public pos_str :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_smelting_equip, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//装备pos 用竖线隔开
		self.pos_str = this.input. readString ();		
		
	}
}





class c2s_storehouse_hand_in
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onStorehouse_hand_in"; 
	private static input:ByteArray;		
	
	/**
	 * 装备pos 用竖线隔开
	 */
	public pos_str :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_storehouse_hand_in, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//装备pos 用竖线隔开
		self.pos_str = this.input. readString ();		
		
	}
}





class c2s_storehouse_exchange
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onStorehouse_exchange"; 
	private static input:ByteArray;		
	
	/**
	 * 宝库的pos
	 */
	public pos :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_storehouse_exchange, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//宝库的pos
		self.pos = this.input. readUint32 ();		
		
	}
}





class c2s_storehouse_destroy
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onStorehouse_destroy"; 
	private static input:ByteArray;		
	
	/**
	 * 宝库的pos
	 */
	public pos :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_storehouse_destroy, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//宝库的pos
		self.pos = this.input. readUint32 ();		
		
	}
}





class c2s_send_faction_gift
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onSend_faction_gift"; 
	private static input:ByteArray;		
	
	/**
	 * 礼物list
	 */
	public list :Array<item_reward_info > = new Array(); //item_reward_info
	/**
	 * 留言
	 */
	public msg :string ;	//String		
	/**
	 * 留言类型
	 */
	public msg_type :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_send_faction_gift, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//礼物list
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:item_reward_info = new item_reward_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
		//留言
		self.msg = this.input. readString ();		
		
		//留言类型
		self.msg_type = this.input. readUint32 ();		
		
	}
}





class c2s_get_faction_gift_exreward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGet_faction_gift_exreward"; 
	private static input:ByteArray;		
	
	/**
	 * 礼物的count_id
	 */
	public count_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_faction_gift_exreward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//礼物的count_id
		self.count_id = this.input. readUint32 ();		
		
	}
}





class c2s_get_all_faction_gift_exreward
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGet_all_faction_gift_exreward"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_all_faction_gift_exreward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_show_faction_gift_page
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onShow_faction_gift_page"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_faction_gift_page, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_show_faction_gift_info
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onShow_faction_gift_info"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_faction_gift_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_show_faction_gift_unthank_page
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onShow_faction_gift_unthank_page"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_faction_gift_unthank_page, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_show_faction_gift_history_page
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onShow_faction_gift_history_page"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_faction_gift_history_page, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_get_faction_gift_rank_page
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGet_faction_gift_rank_page"; 
	private static input:ByteArray;		
	
	/**
	 * 页数
	 */
	public page :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_faction_gift_rank_page, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//页数
		self.page = this.input. readUint32 ();		
		
	}
}





class s2c_show_faction_gift_rank_result_list
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onShow_faction_gift_rank_result_list"; 
	private static input:ByteArray;		
	
	/**
	 * 排行列表
	 */
	public list :Array<faction_gift_rank_info > = new Array(); //faction_gift_rank_info
	/**
	 * 本帮派排行信息
	 */
	public info :faction_gift_rank_info  ;	//faction_gift_rank_info		
	/**
	 * 页数
	 */
	public page :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_faction_gift_rank_result_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//排行列表
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:faction_gift_rank_info = new faction_gift_rank_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
		//本帮派排行信息
		self.info = new faction_gift_rank_info;
		self.info .read(this.input);
		
		//页数
		self.page = this.input. readUint32 ();		
		
	}
}





class s2c_show_faction_gift_rank_change
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onShow_faction_gift_rank_change"; 
	private static input:ByteArray;		
	
	/**
	 * 原排行
	 */
	public old_rank :number ;	//uint32		
	/**
	 * 新排行
	 */
	public new_rank :number ;	//uint32		
	/**
	 * 本帮派排行信息
	 */
	public info :faction_gift_rank_info  ;	//faction_gift_rank_info		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_faction_gift_rank_change, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//原排行
		self.old_rank = this.input. readUint32 ();		
		
		//新排行
		self.new_rank = this.input. readUint32 ();		
		
		//本帮派排行信息
		self.info = new faction_gift_rank_info;
		self.info .read(this.input);
		
	}
}





class s2c_show_faction_gift_rank_info
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onShow_faction_gift_rank_info"; 
	private static input:ByteArray;		
	
	/**
	 * 本帮派排行信息
	 */
	public info :faction_gift_rank_info  ;	//faction_gift_rank_info		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_faction_gift_rank_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//本帮派排行信息
		self.info = new faction_gift_rank_info;
		self.info .read(this.input);
		
	}
}





class c2s_divine_forge
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onDivine_forge"; 
	private static input:ByteArray;		
	
	/**
	 * 神兵id
	 */
	public id :number ;	//uint32		
	/**
	 * 次数
	 */
	public count :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_divine_forge, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//神兵id
		self.id = this.input. readUint32 ();		
		
		//次数
		self.count = this.input. readUint32 ();		
		
	}
}





class c2s_divine_advance
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onDivine_advance"; 
	private static input:ByteArray;		
	
	/**
	 * 神兵id
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_divine_advance, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//神兵id
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_divine_spirit
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onDivine_spirit"; 
	private static input:ByteArray;		
	
	/**
	 * 神兵id
	 */
	public id :number ;	//uint32		
	/**
	 * 失败保护
	 */
	public protect :number ;	//uint32		
	/**
	 * 提升概率
	 */
	public improve :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_divine_spirit, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//神兵id
		self.id = this.input. readUint32 ();		
		
		//失败保护
		self.protect = this.input. readUint32 ();		
		
		//提升概率
		self.improve = this.input. readUint32 ();		
		
	}
}





class c2s_query_mass_boss_info
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onQuery_mass_boss_info"; 
	private static input:ByteArray;		
	
	/**
	 * 全民boss编号
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_query_mass_boss_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//全民boss编号
		self.id = this.input. readUint8 ();		
		
	}
}





class s2c_mass_boss_info_ret
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onMass_boss_info_ret"; 
	private static input:ByteArray;		
	
	/**
	 * 全民boss参加人数
	 */
	public count :number ;	//uint32		
	/**
	 * 当前boss血量
	 */
	public percent :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_mass_boss_info_ret, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//全民boss参加人数
		self.count = this.input. readUint32 ();		
		
		//当前boss血量
		self.percent = this.input. readUint8 ();		
		
	}
}





class c2s_query_mass_boss_rank
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onQuery_mass_boss_rank"; 
	private static input:ByteArray;		
	
	/**
	 * 全民boss编号
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_query_mass_boss_rank, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//全民boss编号
		self.id = this.input. readUint8 ();		
		
	}
}





class s2c_mass_boss_rank_result
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onMass_boss_rank_result"; 
	private static input:ByteArray;		
	
	/**
	 * 全民boss排名信息
	 */
	public info :Array<rank_info > = new Array(); //rank_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_mass_boss_rank_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//全民boss排名信息
		if( self.info .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _info:rank_info = new rank_info;
			_info .read(this.input);
			self.info .push(_info);
		}
		
	}
}





class c2s_try_mass_boss
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onTry_mass_boss"; 
	private static input:ByteArray;		
	
	/**
	 * 全民boss编号
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_try_mass_boss, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//全民boss编号
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_buy_mass_boss_times
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onBuy_mass_boss_times"; 
	private static input:ByteArray;		
	
	/**
	 * 购买次数
	 */
	public cnt :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_buy_mass_boss_times, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//购买次数
		self.cnt = this.input. readUint8 ();		
		
	}
}





class c2s_group_instance_match
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onGroup_instance_match"; 
	private static input:ByteArray;		
	
	/**
	 * 组队副本类型
	 */
	public indx :number ;	//uint8		
	/**
	 * 是否组队进入
	 */
	public isGroup :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_group_instance_match, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//组队副本类型
		self.indx = this.input. readUint8 ();		
		
		//是否组队进入
		self.isGroup = this.input. readUint8 ();		
		
	}
}





class c2s_buy_group_instance_times
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onBuy_group_instance_times"; 
	private static input:ByteArray;		
	
	/**
	 * 数量
	 */
	public count :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_buy_group_instance_times, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//数量
		self.count = this.input. readUint8 ();		
		
	}
}





class c2s_talisman_active
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onTalisman_active"; 
	private static input:ByteArray;		
	
	/**
	 * 法宝id
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_talisman_active, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//法宝id
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_talisman_lvup
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onTalisman_lvup"; 
	private static input:ByteArray;		
	
	/**
	 * 法宝id
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_talisman_lvup, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//法宝id
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_wings_active
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onWings_active"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_wings_active, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_wings_bless
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onWings_bless"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_wings_bless, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_wings_rankup
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onWings_rankup"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_wings_rankup, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_wings_strength
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onWings_strength"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_wings_strength, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_meridian_practise
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onMeridian_practise"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_meridian_practise, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_add_meridian_exp
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onAdd_meridian_exp"; 
	private static input:ByteArray;		
	
	/**
	 * 修炼道具的序号列表
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_add_meridian_exp, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//修炼道具的序号列表
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_raise_mount_level_base
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onRaise_mount_level_base"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_raise_mount_level_base, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_active_mount
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onActive_mount"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_active_mount, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_show_faction_bossdefense_damage_list
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onShow_faction_bossdefense_damage_list"; 
	private static input:ByteArray;		
	
	/**
	 * 输出排行
	 */
	public list :Array<mass_boss_rank_info > = new Array(); //mass_boss_rank_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_faction_bossdefense_damage_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//输出排行
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:mass_boss_rank_info = new mass_boss_rank_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class s2c_show_faction_tower_sweep_list
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onShow_faction_tower_sweep_list"; 
	private static input:ByteArray;		
	
	/**
	 * 扫荡物品
	 */
	public list :Array<item_reward_info > = new Array(); //item_reward_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_faction_tower_sweep_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//扫荡物品
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:item_reward_info = new item_reward_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class s2c_send_instance_result
{				
	public optcode:number = 0;
	public static param_count:number = 5;
	public static optname:string = "onSend_instance_result"; 
	private static input:ByteArray;		
	
	/**
	 * 副本状态(249:副本失败&250:副本通关&251:副本未通关)
	 */
	public state :number ;	//uint8		
	/**
	 * 副本cd
	 */
	public cd :number ;	//uint8		
	/**
	 * 道具列表
	 */
	public list :Array<item_reward_info > = new Array(); //item_reward_info
	/**
	 * 副本类型
	 */
	public type :number ;	//uint8		
	/**
	 * 额外数据
	 */
	public data :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_send_instance_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//副本状态(249:副本失败&250:副本通关&251:副本未通关)
		self.state = this.input. readUint8 ();		
		
		//副本cd
		self.cd = this.input. readUint8 ();		
		
		//道具列表
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:item_reward_info = new item_reward_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
		//副本类型
		self.type = this.input. readUint8 ();		
		
		//额外数据
		self.data = this.input. readString ();		
		
	}
}





class c2s_match_single_pvp
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onMatch_single_pvp"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_match_single_pvp, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_buy_match_single_pvp_times
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onBuy_match_single_pvp_times"; 
	private static input:ByteArray;		
	
	/**
	 * 购买次数
	 */
	public cnt :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_buy_match_single_pvp_times, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//购买次数
		self.cnt = this.input. readUint8 ();		
		
	}
}





class c2s_pick_match_single_pvp_extra_reward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPick_match_single_pvp_extra_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 领取序号
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_match_single_pvp_extra_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//领取序号
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_equipdevelop_operate
{				
	public optcode:number = 0;
	public static param_count:number = 5;
	public static optname:string = "onEquipdevelop_operate"; 
	private static input:ByteArray;		
	
	/**
	 * 操作类型
	 */
	public opt_type :number ;	//uint8		
	/**
	 * 预留int值1
	 */
	public reserve_int1 :number ;	//uint16		
	/**
	 * 预留int值2
	 */
	public reserve_int2 :number ;	//uint16		
	/**
	 * 预留string值1
	 */
	public reserve_str1 :string ;	//String		
	/**
	 * 预留string值2
	 */
	public reserve_str2 :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_equipdevelop_operate, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//操作类型
		self.opt_type = this.input. readUint8 ();		
		
		//预留int值1
		self.reserve_int1 = this.input. readUint16 ();		
		
		//预留int值2
		self.reserve_int2 = this.input. readUint16 ();		
		
		//预留string值1
		self.reserve_str1 = this.input. readString ();		
		
		//预留string值2
		self.reserve_str2 = this.input. readString ();		
		
	}
}





class c2s_active_appearance
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onActive_appearance"; 
	private static input:ByteArray;		
	
	/**
	 * 外观id
	 */
	public id :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_active_appearance, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//外观id
		self.id = this.input. readUint16 ();		
		
	}
}





class c2s_equip_appearance
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onEquip_appearance"; 
	private static input:ByteArray;		
	
	/**
	 * 外观id
	 */
	public id :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_equip_appearance, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//外观id
		self.id = this.input. readUint16 ();		
		
	}
}





class c2s_cancel_equip_appearance
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onCancel_equip_appearance"; 
	private static input:ByteArray;		
	
	/**
	 * 外观类型
	 */
	public type :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_cancel_equip_appearance, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//外观类型
		self.type = this.input. readUint8 ();		
		
	}
}





class c2s_rename
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onRename"; 
	private static input:ByteArray;		
	
	/**
	 * 修改的名称
	 */
	public name :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_rename, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//修改的名称
		self.name = this.input. readString ();		
		
	}
}





class c2s_unlock_title
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onUnlock_title"; 
	private static input:ByteArray;		
	
	/**
	 * 称号id
	 */
	public indx :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_unlock_title, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//称号id
		self.indx = this.input. readUint8 ();		
		
	}
}





class c2s_social_buy_revenge_times
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSocial_buy_revenge_times"; 
	private static input:ByteArray;		
	
	/**
	 * 次数
	 */
	public count :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_social_buy_revenge_times, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//次数
		self.count = this.input. readUint8 ();		
		
	}
}





class c2s_enter_risk_instance
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onEnter_risk_instance"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_enter_risk_instance, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_social_remove_enemy
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSocial_remove_enemy"; 
	private static input:ByteArray;		
	
	/**
	 * guid
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_social_remove_enemy, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//guid
		self.guid = this.input. readString ();		
		
	}
}





class c2s_get_player_overview
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGet_player_overview"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家id
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_player_overview, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家id
		self.guid = this.input. readString ();		
		
	}
}





class s2c_show_player_overview
{				
	public optcode:number = 0;
	public static param_count:number = 8;
	public static optname:string = "onShow_player_overview"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家id
	 */
	public guid :string ;	//String		
	/**
	 * 名称
	 */
	public name :string ;	//String		
	/**
	 * 战力
	 */
	public force :number ;	//uint32		
	/**
	 * vip
	 */
	public vip :number ;	//uint32		
	/**
	 * 称号
	 */
	public title :number ;	//uint32		
	/**
	 * 性别
	 */
	public gender :number ;	//uint32		
	/**
	 * 外观
	 */
	public coat :number ;	//uint32		
	/**
	 * 武器外观
	 */
	public weapon :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_player_overview, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家id
		self.guid = this.input. readString ();		
		
		//名称
		self.name = this.input. readString ();		
		
		//战力
		self.force = this.input. readUint32 ();		
		
		//vip
		self.vip = this.input. readUint32 ();		
		
		//称号
		self.title = this.input. readUint32 ();		
		
		//性别
		self.gender = this.input. readUint32 ();		
		
		//外观
		self.coat = this.input. readUint32 ();		
		
		//武器外观
		self.weapon = this.input. readUint32 ();		
		
	}
}





class c2s_send_faction_invite
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSend_faction_invite"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家id
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_send_faction_invite, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家id
		self.guid = this.input. readString ();		
		
	}
}





class s2c_show_faction_invite
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onShow_faction_invite"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家id
	 */
	public guid :string ;	//String		
	/**
	 * 玩家名称
	 */
	public name :string ;	//String		
	/**
	 * 家族id
	 */
	public faction_guid :string ;	//String		
	/**
	 * 家族名称
	 */
	public faction_name :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_faction_invite, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家id
		self.guid = this.input. readString ();		
		
		//玩家名称
		self.name = this.input. readString ();		
		
		//家族id
		self.faction_guid = this.input. readString ();		
		
		//家族名称
		self.faction_name = this.input. readString ();		
		
	}
}





class c2s_buy_vipgift
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onBuy_vipgift"; 
	private static input:ByteArray;		
	
	/**
	 * 礼包id
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_buy_vipgift, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//礼包id
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_activity_opt_buy_dailygift
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onActivity_opt_buy_dailygift"; 
	private static input:ByteArray;		
	
	/**
	 * 活动id
	 */
	public act_id :number ;	//uint32		
	/**
	 * 礼包下标
	 */
	public index :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_activity_opt_buy_dailygift, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//活动id
		self.act_id = this.input. readUint32 ();		
		
		//礼包下标
		self.index = this.input. readUint32 ();		
		
	}
}





class c2s_draw_lottery
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onDraw_lottery"; 
	private static input:ByteArray;		
	
	/**
	 * 活动id
	 */
	public actId :number ;	//uint32		
	/**
	 * 类型
	 */
	public type :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_draw_lottery, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//活动id
		self.actId = this.input. readUint32 ();		
		
		//类型
		self.type = this.input. readUint8 ();		
		
	}
}





class c2s_activity_opt_get_rank_process_reward
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onActivity_opt_get_rank_process_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 活动id
	 */
	public act_id :number ;	//uint32		
	/**
	 * 奖励下标
	 */
	public index :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_activity_opt_get_rank_process_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//活动id
		self.act_id = this.input. readUint32 ();		
		
		//奖励下标
		self.index = this.input. readUint32 ();		
		
	}
}





class c2s_activity_opt_get_rank_list
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onActivity_opt_get_rank_list"; 
	private static input:ByteArray;		
	
	/**
	 * 活动id
	 */
	public act_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_activity_opt_get_rank_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//活动id
		self.act_id = this.input. readUint32 ();		
		
	}
}





class s2c_activity_opt_show_rank_list
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onActivity_opt_show_rank_list"; 
	private static input:ByteArray;		
	
	/**
	 * 活动id
	 */
	public act_id :number ;	//uint32		
	/**
	 * 排行列表
	 */
	public list :Array<act_rank_info > = new Array(); //act_rank_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_activity_opt_show_rank_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//活动id
		self.act_id = this.input. readUint32 ();		
		
		//排行列表
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:act_rank_info = new act_rank_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class c2s_activity_opt_buy_limitgift
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onActivity_opt_buy_limitgift"; 
	private static input:ByteArray;		
	
	/**
	 * 活动id
	 */
	public act_id :number ;	//uint32		
	/**
	 * 礼包下标
	 */
	public index :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_activity_opt_buy_limitgift, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//活动id
		self.act_id = this.input. readUint32 ();		
		
		//礼包下标
		self.index = this.input. readUint32 ();		
		
	}
}





class c2s_welfare_get_recharge_reward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onWelfare_get_recharge_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 奖励id
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_welfare_get_recharge_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//奖励id
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_welfare_get_consume_reward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onWelfare_get_consume_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 奖励id
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_welfare_get_consume_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//奖励id
		self.id = this.input. readUint8 ();		
		
	}
}





class c2s_welfare_get_sevenday_reward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onWelfare_get_sevenday_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 奖励id
	 */
	public id :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_welfare_get_sevenday_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//奖励id
		self.id = this.input. readUint8 ();		
		
	}
}





class s2c_send_server_open_time
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSend_server_open_time"; 
	private static input:ByteArray;		
	
	/**
	 * 时间戳
	 */
	public open_time :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_send_server_open_time, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//时间戳
		self.open_time = this.input. readUint32 ();		
		
	}
}





class c2s_risk_get_rank
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onRisk_get_rank"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_risk_get_rank, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_risk_get_rank_result
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onRisk_get_rank_result"; 
	private static input:ByteArray;		
	
	/**
	 * 排行列表
	 */
	public list :Array<act_rank_info > = new Array(); //act_rank_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_risk_get_rank_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//排行列表
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:act_rank_info = new act_rank_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class c2s_set_orient
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSet_orient"; 
	private static input:ByteArray;		
	
	/**
	 * 角度
	 */
	public angle :number ;	//uint16		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_set_orient, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//角度
		self.angle = this.input. readUint16 ();		
		
	}
}





class c2s_use_moneytree
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onUse_moneytree"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_use_moneytree, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_get_moneytree_gift
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGet_moneytree_gift"; 
	private static input:ByteArray;		
	
	/**
	 * 礼包id
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_moneytree_gift, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//礼包id
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_set_world_risk_last_id
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSet_world_risk_last_id"; 
	private static input:ByteArray;		
	
	/**
	 * 幻境id
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_set_world_risk_last_id, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//幻境id
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_enter_private_boss
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onEnter_private_boss"; 
	private static input:ByteArray;		
	
	/**
	 * Bossid
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_enter_private_boss, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//Bossid
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_raise_base_spell_all
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onRaise_base_spell_all"; 
	private static input:ByteArray;		
	
	/**
	 * 技能类型
	 */
	public raiseType :number ;	//uint8		
	/**
	 * 技能ID字符串
	 */
	public spellIdStr :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_raise_base_spell_all, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//技能类型
		self.raiseType = this.input. readUint8 ();		
		
		//技能ID字符串
		self.spellIdStr = this.input. readString ();		
		
	}
}





class c2s_use_restore_potion
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onUse_restore_potion"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_use_restore_potion, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_pick_quest_adventure
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPick_quest_adventure"; 
	private static input:ByteArray;		
	
	/**
	 * 下标
	 */
	public indx :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_quest_adventure, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//下标
		self.indx = this.input. readUint32 ();		
		
	}
}





class c2s_raise_adventurespell
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onRaise_adventurespell"; 
	private static input:ByteArray;		
	
	/**
	 * 技能ID
	 */
	public spellId :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_raise_adventurespell, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//技能ID
		self.spellId = this.input. readUint32 ();		
		
	}
}





class c2s_pick_quest_realmbreak
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPick_quest_realmbreak"; 
	private static input:ByteArray;		
	
	/**
	 * 下标
	 */
	public indx :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_quest_realmbreak, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//下标
		self.indx = this.input. readUint32 ();		
		
	}
}





class c2s_pick_realmbreak_daily_reward
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onPick_realmbreak_daily_reward"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_realmbreak_daily_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_group_create
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onGroup_create"; 
	private static input:ByteArray;		
	
	/**
	 * 队伍类型
	 */
	public type :number ;	//uint32		
	/**
	 * 队伍最低等级
	 */
	public min_lev :number ;	//uint32		
	/**
	 * 队伍最大等级
	 */
	public max_lev :number ;	//uint32		
	/**
	 * 队伍自动接受申请 0 关闭 1 打开
	 */
	public auto_flag :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_group_create, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//队伍类型
		self.type = this.input. readUint32 ();		
		
		//队伍最低等级
		self.min_lev = this.input. readUint32 ();		
		
		//队伍最大等级
		self.max_lev = this.input. readUint32 ();		
		
		//队伍自动接受申请 0 关闭 1 打开
		self.auto_flag = this.input. readUint32 ();		
		
	}
}





class c2s_group_join_request
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGroup_join_request"; 
	private static input:ByteArray;		
	
	/**
	 * 队伍guid
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_group_join_request, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//队伍guid
		self.guid = this.input. readString ();		
		
	}
}





class c2s_group_join_accept
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGroup_join_accept"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家guid
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_group_join_accept, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家guid
		self.guid = this.input. readString ();		
		
	}
}





class c2s_group_quit
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onGroup_quit"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_group_quit, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_group_give_captain
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGroup_give_captain"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家index
	 */
	public index :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_group_give_captain, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家index
		self.index = this.input. readUint32 ();		
		
	}
}





class c2s_group_kick
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGroup_kick"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家index
	 */
	public index :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_group_kick, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家index
		self.index = this.input. readUint32 ();		
		
	}
}





class s2c_show_loot_animate
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onShow_loot_animate"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家guid
	 */
	public info :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_loot_animate, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家guid
		self.info = this.input. readString ();		
		
	}
}





class c2s_enter_stage_instance
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onEnter_stage_instance"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_enter_stage_instance, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_pick_stage_instance_bonus
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPick_stage_instance_bonus"; 
	private static input:ByteArray;		
	
	/**
	 * 宝箱下标
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_stage_instance_bonus, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//宝箱下标
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_enter_group_exp
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onEnter_group_exp"; 
	private static input:ByteArray;		
	
	/**
	 * 是否组队进入
	 */
	public isGroup :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_enter_group_exp, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//是否组队进入
		self.isGroup = this.input. readUint8 ();		
		
	}
}





class s2c_check_for_group_enter
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onCheck_for_group_enter"; 
	private static input:ByteArray;		
	
	/**
	 * 副本子类型
	 */
	public instSubType :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_check_for_group_enter, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//副本子类型
		self.instSubType = this.input. readUint32 ();		
		
	}
}





class c2s_select_group_enter
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onSelect_group_enter"; 
	private static input:ByteArray;		
	
	/**
	 * 结果
	 */
	public choise :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_select_group_enter, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//结果
		self.choise = this.input. readUint8 ();		
		
	}
}





class c2s_buy_group_exp_times
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onBuy_group_exp_times"; 
	private static input:ByteArray;		
	
	/**
	 * 数量
	 */
	public count :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_buy_group_exp_times, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//数量
		self.count = this.input. readUint8 ();		
		
	}
}





class c2s_buy_inspiration
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onBuy_inspiration"; 
	private static input:ByteArray;		
	
	/**
	 * 购买类型
	 */
	public category :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_buy_inspiration, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//购买类型
		self.category = this.input. readUint8 ();		
		
	}
}





class c2s_enter_faction_match_map
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onEnter_faction_match_map"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_enter_faction_match_map, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_pick_faction_match_champion_daily_reward
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onPick_faction_match_champion_daily_reward"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_faction_match_champion_daily_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_query_faction_match_info
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onQuery_faction_match_info"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_query_faction_match_info, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_show_faction_match_info_list
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onShow_faction_match_info_list"; 
	private static input:ByteArray;		
	
	/**
	 * 排行列表
	 */
	public list :Array<faction_match_info > = new Array(); //faction_match_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_faction_match_info_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//排行列表
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:faction_match_info = new faction_match_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class c2s_pick_res_instance_first_reward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onPick_res_instance_first_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 副本id
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_pick_res_instance_first_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//副本id
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_group_send_invite
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGroup_send_invite"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家guid
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_group_send_invite, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家guid
		self.guid = this.input. readString ();		
		
	}
}





class s2c_show_group_invite
{				
	public optcode:number = 0;
	public static param_count:number = 6;
	public static optname:string = "onShow_group_invite"; 
	private static input:ByteArray;		
	
	/**
	 * 队伍guid
	 */
	public guid :string ;	//String		
	/**
	 * 邀请者名称
	 */
	public name :string ;	//String		
	/**
	 * 队伍类型
	 */
	public type :number ;	//uint32		
	/**
	 * 邀请者等级
	 */
	public level :number ;	//uint32		
	/**
	 * 邀请者战力
	 */
	public force :number ;	//double		
	/**
	 * 邀请者guid
	 */
	public sender_guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_group_invite, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//队伍guid
		self.guid = this.input. readString ();		
		
		//邀请者名称
		self.name = this.input. readString ();		
		
		//队伍类型
		self.type = this.input. readUint32 ();		
		
		//邀请者等级
		self.level = this.input. readUint32 ();		
		
		//邀请者战力
		self.force = this.input. readDouble ();		
		
		//邀请者guid
		self.sender_guid = this.input. readString ();		
		
	}
}





class c2s_group_agree_invite
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onGroup_agree_invite"; 
	private static input:ByteArray;		
	
	/**
	 * 队伍guid
	 */
	public guid :string ;	//String		
	/**
	 * 邀请者guid
	 */
	public sendGuid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_group_agree_invite, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//队伍guid
		self.guid = this.input. readString ();		
		
		//邀请者guid
		self.sendGuid = this.input. readString ();		
		
	}
}





class c2s_get_group_search_info_list
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGet_group_search_info_list"; 
	private static input:ByteArray;		
	
	/**
	 * 队伍类型
	 */
	public type :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_group_search_info_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//队伍类型
		self.type = this.input. readUint32 ();		
		
	}
}





class s2c_show_group_search_info_list
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onShow_group_search_info_list"; 
	private static input:ByteArray;		
	
	/**
	 * 队伍信息
	 */
	public list :Array<group_search_info > = new Array(); //group_search_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_group_search_info_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//队伍信息
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:group_search_info = new group_search_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class c2s_group_change_config
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onGroup_change_config"; 
	private static input:ByteArray;		
	
	/**
	 * 队伍类型
	 */
	public type :number ;	//uint32		
	/**
	 * 队伍最低等级
	 */
	public min_lev :number ;	//uint32		
	/**
	 * 队伍最大等级
	 */
	public max_lev :number ;	//uint32		
	/**
	 * 队伍自动接受申请 0 关闭 1 打开
	 */
	public auto_flag :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_group_change_config, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//队伍类型
		self.type = this.input. readUint32 ();		
		
		//队伍最低等级
		self.min_lev = this.input. readUint32 ();		
		
		//队伍最大等级
		self.max_lev = this.input. readUint32 ();		
		
		//队伍自动接受申请 0 关闭 1 打开
		self.auto_flag = this.input. readUint32 ();		
		
	}
}





class s2c_show_group_join_request
{				
	public optcode:number = 0;
	public static param_count:number = 6;
	public static optname:string = "onShow_group_join_request"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家guid
	 */
	public guid :string ;	//String		
	/**
	 * 玩家名称
	 */
	public name :string ;	//String		
	/**
	 * 玩家职业
	 */
	public gender :number ;	//uint32		
	/**
	 * 玩家等级
	 */
	public level :number ;	//uint32		
	/**
	 * 玩家vip等级
	 */
	public vip :number ;	//uint32		
	/**
	 * 玩家战力
	 */
	public force :number ;	//double		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_group_join_request, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家guid
		self.guid = this.input. readString ();		
		
		//玩家名称
		self.name = this.input. readString ();		
		
		//玩家职业
		self.gender = this.input. readUint32 ();		
		
		//玩家等级
		self.level = this.input. readUint32 ();		
		
		//玩家vip等级
		self.vip = this.input. readUint32 ();		
		
		//玩家战力
		self.force = this.input. readDouble ();		
		
	}
}





class c2s_group_join_denied
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGroup_join_denied"; 
	private static input:ByteArray;		
	
	/**
	 * 玩家guid
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_group_join_denied, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//玩家guid
		self.guid = this.input. readString ();		
		
	}
}





class c2s_group_invite_denied
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGroup_invite_denied"; 
	private static input:ByteArray;		
	
	/**
	 * 队伍guid
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_group_invite_denied, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//队伍guid
		self.guid = this.input. readString ();		
		
	}
}





class c2s_talisman_equip
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onTalisman_equip"; 
	private static input:ByteArray;		
	
	/**
	 * 法宝id
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_talisman_equip, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//法宝id
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_talisman_unequip
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onTalisman_unequip"; 
	private static input:ByteArray;		
	
	/**
	 * 槽位id
	 */
	public slot_id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_talisman_unequip, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//槽位id
		self.slot_id = this.input. readUint32 ();		
		
	}
}





class s2c_fullize_hp
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onFullize_hp"; 
	private static input:ByteArray;		
	
	/**
	 * 地图id
	 */
	public guid :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_fullize_hp, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//地图id
		self.guid = this.input. readString ();		
		
	}
}





class c2s_auto_group_match
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onAuto_group_match"; 
	private static input:ByteArray;		
	
	/**
	 * 目标类型
	 */
	public targetType :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_auto_group_match, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//目标类型
		self.targetType = this.input. readUint32 ();		
		
	}
}





class c2s_cancel_auto_group_match
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onCancel_auto_group_match"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_cancel_auto_group_match, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_kuafu_3v3_group_match
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onKuafu_3v3_group_match"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_kuafu_3v3_group_match, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class c2s_booking_money
{				
	public optcode:number = 0;
	public static param_count:number = 4;
	public static optname:string = "onBooking_money"; 
	private static input:ByteArray;		
	
	/**
	 * 订单号
	 */
	public orderid :string ;	//String		
	/**
	 * 商品名称
	 */
	public goodsname :string ;	//String		
	/**
	 * 金额
	 */
	public money1 :string ;	//String		
	/**
	 * 元宝数量
	 */
	public goodsnum :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_booking_money, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//订单号
		self.orderid = this.input. readString ();		
		
		//商品名称
		self.goodsname = this.input. readString ();		
		
		//金额
		self.money1 = this.input. readString ();		
		
		//元宝数量
		self.goodsnum = this.input. readUint32 ();		
		
	}
}





class s2c_booking_money_result
{				
	public optcode:number = 0;
	public static param_count:number = 2;
	public static optname:string = "onBooking_money_result"; 
	private static input:ByteArray;		
	
	/**
	 * 订单号
	 */
	public orderid :string ;	//String		
	/**
	 * 成功或者失败
	 */
	public result :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_booking_money_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//订单号
		self.orderid = this.input. readString ();		
		
		//成功或者失败
		self.result = this.input. readUint8 ();		
		
	}
}





class c2s_one_step_robot_up
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onOne_step_robot_up"; 
	private static input:ByteArray;		
	
	/**
	 * 参数
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_one_step_robot_up, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//参数
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_get_seven_day_recharge_extra_reward
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onGet_seven_day_recharge_extra_reward"; 
	private static input:ByteArray;		
	
	/**
	 * 奖励id
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_get_seven_day_recharge_extra_reward, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//奖励id
		self.id = this.input. readUint32 ();		
		
	}
}





class c2s_use_giftcode
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onUse_giftcode"; 
	private static input:ByteArray;		
	
	/**
	 * 兑换码
	 */
	public giftcode :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_use_giftcode, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//兑换码
		self.giftcode = this.input. readString ();		
		
	}
}





class s2c_show_giftcode_reward_list
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onShow_giftcode_reward_list"; 
	private static input:ByteArray;		
	
	/**
	 * 道具
	 */
	public list :Array<item_reward_info > = new Array(); //item_reward_info

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_giftcode_reward_list, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//道具
		if( self.list .length ) 
			throw Error("通讯对象池有异常");			
		var parmLen:number = this.input.readUint16();			
		for(var i:number=0;i<parmLen;i++){
			var _list:item_reward_info = new item_reward_info;
			_list .read(this.input);
			self.list .push(_list);
		}
		
	}
}





class c2s_lottery_recharge
{				
	public optcode:number = 0;
	public static param_count:number = 0;
	public static optname:string = "onLottery_recharge"; 
	private static input:ByteArray;		
	

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:c2s_lottery_recharge, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
	}
}





class s2c_lottery_recharge_result
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onLottery_recharge_result"; 
	private static input:ByteArray;		
	
	/**
	 * 抽奖indx
	 */
	public indx :number ;	//uint8		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_lottery_recharge_result, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//抽奖indx
		self.indx = this.input. readUint8 ();		
		
	}
}





class s2c_show_cast_remain_skill
{				
	public optcode:number = 0;
	public static param_count:number = 1;
	public static optname:string = "onShow_cast_remain_skill"; 
	private static input:ByteArray;		
	
	/**
	 * 技能id
	 */
	public id :number ;	//uint32		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_show_cast_remain_skill, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//技能id
		self.id = this.input. readUint32 ();		
		
	}
}





class s2c_after_create_role
{				
	public optcode:number = 0;
	public static param_count:number = 3;
	public static optname:string = "onAfter_create_role"; 
	private static input:ByteArray;		
	
	/**
	 * 服务器id
	 */
	public serverId :string ;	//String		
	/**
	 * 角色id
	 */
	public guid :string ;	//String		
	/**
	 * 玩家名称
	 */
	public nickname :string ;	//String		

	/**
	 从输入二进制流中读取结构体
	 */
	public static read(self:s2c_after_create_role, bytes:ByteArray):void
	{		
		if(this.input == null) 
			this.input = new ByteArray();							
		this.input =  bytes;
		
		//var parmLen:uint;
		//var i:int;
		//服务器id
		self.serverId = this.input. readString ();		
		
		//角色id
		self.guid = this.input. readString ();		
		
		//玩家名称
		self.nickname = this.input. readString ();		
		
	}
}



//Just Mcfunction
exports .main = function ( yc ) {
	let merge = function ( str , max , split , call ) {
		str = str .split ( "\n" )
		let obj = { }
		obj .res = [ ]
		obj .is = true
		obj .len = 0
		obj .use = 0
		obj .data = { }
		obj .max = 20
		obj .end = null
		obj .p = 0
		obj .all = 0
		if ( ! split ) {
			obj .max = 999999
		}
		obj .addchuck = function ( x , y , z , b , d ) {
			let x1 = num1 ( x )
			let y1 = num1 ( y )
			let z1 = num1 ( z )
			if ( split == false ) {
				x1 = 0
				y1 = 0
				z1 = 0
			}
			if ( ! obj .data [ x1 + " " + y1 + " " + z1 ] ) {
				obj .data [ x1 + " " + y1 + " " + z1 ] = { }
				obj .end = x1 + " " + y1 + " " + z1
				obj .use += 50
			}
			obj .data [ x1 + " " + y1 + " " + z1 ] [ x + " " + y + " " + z ] = [ b , d ]
			if ( split !== false ) {
				obj .use += 0.5
			} else {
				obj .use += 1.5
			}
			obj .len += 1
			if ( obj .use > max ) {
				call ( {
					type: "over"
				} )
				return false
			}
			return true
		}
		obj .merge = function ( ) {
			let p = -1
			try{
			for ( let i in obj .data ) {
				p += 1
				let H = i
				setTimeout ( function ( ) {
					if ( false == obj .merges ( obj .data [ H ] , H ) ) {
						obj .is = false
						call ( {
							type: "未知错误"
						} )
						return false
					}
				} , ( 1000 / 20 * p ) )
			}
			}catch(e){
				console.log(e)
			}
		}
		obj .merges = function ( D , e ) {
			let E = e
			e = e .split ( " " )
			let is = function ( x , y , z , b , d ) {
				let p = D [ x + " " + y + " " + z ]
				if ( p ) {
					if ( p [ 0 ] == b && p [ 1 ] == d ) {
						return true
					}
				}
				return false
			}
			let re = function ( x , y , z ) {
				delete D [ x + " " + y + " " + z ]
			}
			let side = function ( x , y , z , x1 , y1 , z1 , b , d , tag ) {
				//console.log("side",x,y,z,x1,y1,z1,b,d,tag)
				for ( let i = x; i <= x1; i ++ ) {
					for ( let j = y; j <= y1; j ++ ) {
						for ( let k = z; k <= z1; k ++ ) {
							//console.log(i,j,k)
							if ( ! is ( i , j , k , b , d ) ) return false
						}
					}
				}
				return true
			}
			let reside = function ( x , y , z , x1 , y1 , z1 , b , d ) {
				for ( let i = x; i <= x1; i ++ ) {
					for ( let j = y; j <= y1; j ++ ) {
						for ( let k = z; k <= z1; k ++ ) {
							re ( i , j , k )
						}
					}
				}
			}
			let ex = num ( e [ 0 ] ) * obj .max + obj .max
			let ey = num ( e [ 1 ] ) * obj .max + obj .max
			let ez = num ( e [ 2 ] ) * obj .max + obj .max
			//循环主
			//console.log(ex,ey,ez)
			for ( let F in D ) {
				let v = D [ F ]
				let b = v [ 0 ]
				let d = v [ 1 ]
				let o = F .split ( " " )
				//开始坐标
				let sx = num ( o [ 0 ] )
				let sy = num ( o [ 1 ] )
				let sz = num ( o [ 2 ] )
				//console.log(sx,sy,sz)
				//detail
				let dx = 0
				let dy = 0
				let dz = 0
				//ijk
				
				let i = sx
				let j = sy
				let k = sz
				
				//扩散算法
				
				while ( true ) {
					let isF = false
					let Dx = 0
					let Dy = 0
					let Dz = 0
					if ( is ( i+1 ,j ,k ,b ,d ) ) {
						i ++
						isF = true
						Dx = -1
					}
					if ( is ( i ,j+1 ,k ,b ,d ) ) {
						j ++
						isF = true 
						Dy = -1
					}
					if ( is ( i ,j ,k+1 ,b ,d) ) {
						k ++
						isF = true
						Dz = -1
					}
					//console.log(["if",Dx,Dy,Dz])
					if ( isF ) {
						//console.log(["pos",i,j,k])
						let l1 = ( i < ex && j < ey && k < ez )
						let l2 = true
						if ( Dx !== 0 ) {
							l2 = side ( i, sy, sz, i, j-Dy, k-Dz, b, d , "l2" )
							//console.log("x",l2)
						}
						let l3 = true
						if ( Dy !== 0 ) {
							l3 = side ( sx, j, sz, i-Dx, j, k-Dz, b, d , "l3" )
							
							//console.log("y",l3)
						}
						let l4 = true
						if ( Dz !== 0 ) {
							l4 = side ( sx, sy, k, i-Dx, j-Dy, k, b, d , "l4")
							//console.log("z",l4)
						}
						//console.log([l2,l3,l4,i,j,k])
						if ( ! ( l1 && l2 && l3 && l4 ) ) {
							//console.log("end",i,j,k)
							dx = i - sx - Dx
							dy = j - sy - Dy
							dz = k - sz - Dz
							if ( ! l2 ) {
								dx --
							}
							if ( ! l3 ) {
								dy --
							}
							if ( ! l4 ) {
								dz --
							}
							break
						} else {
							//console.log(["pass",i,j,k])
						}
					} else {
						//console.log(["bre",i,j,k])
						dx = i - sx
						dy = j - sy
						dz = k - sz
						break
					}
				}
				reside ( sx, sy, sz, sx+dx, sy+dy, sz+dz )
				//DX DY DZ
				//console.log(obj)
				//console.log(sx,sy,sz,dx,dy,dz)
				if ( dx !== 0 || dy !== 0 || dz !== 0 ) {
					obj .res .push ( "fill ~" + sx + " ~" + sy + " ~" + sz + " ~" + ( sx + dx ) + " ~" + ( sy + dy ) + " ~" + ( sz + dz ) + " " + b + " " + d )
				} else {
					obj .res .push ( "setblock ~" + sx + " ~" + sy + " ~" + sz + " " + b + " " + d )
				}
			}
			//console.log(e,obj.end,obj.res)
			//console.log(E,obj.end)
			obj .p += 1
			call ( {
				type: "p",
				i: obj .p,
				all: obj .all
			} )
			if ( E == obj .end ) {
				call ( {
					type: "end",
					k: Math .round ( obj .res .length / obj .len * 100 ),
					data: obj .res,
					use: obj .use,
					len: obj .len,
					//obj,
					alldata: obj .data
				} )
				//console.log(obj)
			}
		}
		for ( let i in str ) {
			let d = merge_a ( str [ i ] )
			for ( let j in d ) {
				if ( false == obj .addchuck .apply ( null , d [ j ] ) ) {
					return
				}
			}
		}
		/*
		let P = { d: obj }
		console.log(P)
		*/
		for ( let i in obj .data ) {
			obj .all += 1
		}
		obj .merge ( )
		
		//console.log()
	}
	//解析指令
	let merge_a = function ( s ) {
		//fill~~~air0
		//fill~3~~3~~air0
		//setblock~~~air0
		//setblock~3~~3air0
		let ary = [ ]
		s = s .split ( "~" )
		//console.log(s)
		if ( s .length >= 6 ) {
			let end = s [ 6 ] .replace ( /\s+/g, " " ) .split ( " " )
			let d = {
				pos: [ num ( s [ 1 ] ) , num ( s [ 2 ] ) , num ( s [ 3 ] ) , num ( s [ 4 ] ) , num ( s [ 5 ] ) , num ( end [ 0 ] ) ],
				type: "fill",
				b: end [ 1 ],
				d: num ( end [ 2 ] )
			}
			//解析为setblock
			let x = sort ( d .pos [ 0 ] , d .pos [ 3 ] )
			let y = sort ( d .pos [ 1 ] , d .pos [ 4 ] )
			let z = sort ( d .pos [ 2 ] , d .pos [ 5 ] )
			//console.log(x,y,z)
			for ( let i = x .min; i <= x .max ; i ++ ) {
				for ( let j = y .min; j <= y .max ; j ++ ) {
					for ( let k = z .min; k <= z .max ; k ++ ) {
						//console.log(i,j,k)
						if ( i <= x .max || j <= y .max || k <= z .max ) {
							
							//push
							ary .push ( [
								i, j, k, d .b, d .d
							] )
						}
					}
				}
			}
		} else 
		if ( s .length >= 3 ) {
			let end = s [ 3 ] .replace ( /\s+/g, " " ) .split ( " " )
			ary .push ( [
				num ( s [ 1 ] ) , num ( s [ 2 ] ) , num ( end [ 0 ] ) ,end [ 1 ], num ( end [ 2 ] ) 
			] )
		} else {
			ary = [ ]
		}
		return ary
	}
	let num = function ( str ) {
		//str = str .replace ( /\s+/g, "" )
		if ( str == "" ) {
			return 0
		}
		return Number ( str )
	}
	let sort = function ( ) {
		let min = arguments [ 0 ]
		let max = arguments [ 0 ]
		for ( let i in arguments ) {
			if ( arguments [ i ] < min ) {
				min = arguments [ i ] 
			} else
			if ( arguments [ i ] > max ) {
				max = arguments [ i ]
			}
		}
		return { min , max }
	}
	//坐标合并
	let num1 = function ( b ) {
		b = b / 20
		if ( b >= 0 ) {
			if ( b < Math .round ( b ) ) {
				return Math .round ( b ) -1
			} else {
				return Math .round ( b )
			}
		} else {
			if ( b < Math .round ( b ) ) {
				return Math .round ( b ) - 1
			} else {
				return Math .round ( b )
			}
		}
	}
	yc .set ( "merge" , merge )
	
	merge ( yc.readfile('./test.txt','utf8'), 100000 , true , function ( res ) {
		if (res.type!=='end'){
			console.log(res)
		}
		if ( res .type == 'end' ) {
			yc .c ( 's' , '[16万彩色主城]三维优化测试成功，优化率:' + res .k )
			yc .writefile ( './m.txt' , res .data .join ( '\n' ) )
		}
	} )
	
}
export const CONTAINER_WIDTH = 750

export const CONTAINER_HEIGHT = 1080

export const objHitTest = (objA, objB) => {
	// 找出不碰撞的情况后取反，就是碰撞的结果

	return (
		objA.x + objA.width >= objB.x &&
		objB.x + objB.width >= objA.x &&
		objA.y + objA.height >= objB.y &&
		objB.y + objB.height >= objA.y
	)
}

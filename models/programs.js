const programs = [
	{
		name: 'make one count',
		maxPullups: 3,
		sets: {
			'1': {
				week: 1,
				day: 1,
				exercise: {
					WarmUp: {
						qty: 1,
						sets: 1
					},
					'Pull-up assessment': {
						qty: 0,
						sets: 1,
						rest: 90
					},
					'Hollow Rocks': {
						qty: 10,
						sets: 2,
						rest: 90
					},
					'Scapular retractions': {
						qty: 5,
						sets: 2,
						rest: 90
					},
					'Dead hangs': {
						timeArray: [15, 30, 15],
						sets: 2,
						rest: 90
					},
					'Planks': {
						time: 20,
						sets: 8,
						rest: 10
					}
				}
			},
			'2': {
				week: 1,
				day: 2,
				exercise: {
					WarmUp: {
						qty: 1,
						sets: 1
					},
					'Pull-up assessment': {
						qty: 0,
						sets: 1,
						rest: 90
					},
					'Body-weight negatives': {
						time: 3,
						sets: 8,
						rest: 90
					},
					'Jumping pull-ups': {
						qty: 1,
						sets: 10,
						rest: 90
					},
					'Modified L-Sits': {
						timeArray: [5, 10, 15],
						sets: 2,
						rest: 90
					},
					'Burpees': {
						time: 20,
						sets: 8,
						rest: 10
					}
				}
			},
			'3': {
				week: 1,
				day: 3,
				exercise: {
					WarmUp: {
						qty: 1,
						sets: 1
					},
					'Pull-up assessment': {
						qty: 0,
						sets: 1,
						rest: 90
					},
					'Body-weight negatives': {
						time: 3,
						sets: 8,
						rest: 90
					},
					'Partial ROM pull-ups': {
						qty: 4,
						sets: 1,
						rest: 90
					},
					'Hanging leg raise': {
						qty: 4,
						sets: 2,
						rest: 90
					},
					'Sprints': {
						time: 30,
						sets: 6
					}
				}
			},
			'4': {
				week: 1,
				day: 4,
				exercise: {
					WarmUp: {
						qty: 1,
						sets: 1
					},
					'Pull-up assessment': {
						qty: 0,
						sets: 1,
						rest: 90
					},
					'Body-weight negatives': {
						time: 3,
						sets: 8,
						rest: 90
					},
					'Jumping pull-ups': {
						qty: 1,
						sets: 10,
						rest: 90
					},
					'Dead hangs': {
						timeArray: [15, 30, 15],
						sets: 2,
						rest: 90
					},
					'Squats': {
						time: 20,
						sets: 8,
						rest: 10
					}
				}
			},
			'5': {
				week: 1,
				day: 5,
				exercise: {
					WarmUp: {
						qty: 1,
						sets: 1
					},
					'Pull-up assessment': {
						qty: 0,
						sets: 1,
						rest: 90
					},
					'Body-weight negatives': {
						time: 3,
						sets: 8,
						rest: 90
					},
					'Partial ROM pull-ups': {
						qty: 4,
						sets: 1,
						rest: 90
					},
					'Hanging leg raises': {
						qty: 4,
						sets: 2,
						rest: 90
					},
					'400M Jog': {
						qty: 5,
						sets: 1,
						rest: 10
					}
				}
			}
		}
	}
];

module.exports = programs;
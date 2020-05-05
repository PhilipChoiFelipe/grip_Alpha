const programs = [
	{
		name: 'Recon Ron - NEGATIVE',
		min: 0,
		max: 3,
		instruction: {
			title: 'Negative pullup sets to achieve full 3 pullups',
		},
		sets: {
			1: {
				exercise_description: [
				'Start from top then slowly descend while counting 3 seconds',
				'Concentrate while you in descending position',
				'Focus on your forearm and back muscle burning'
				],
				shortenedSet: [6, 5, 5, 4, 3],
				set: [
					{
						exercise: 'Negative Pullup',
						rep: 6,
					}, 
					{
						exercise: 'Negative Pullup',
						rep: 5,
					},
					{
						exercise: 'Negative Pullup',
						rep: 5,
					},
					{
						exercise: 'Negative Pullup',
						rep: 4,
					},
					{
						exercise: 'Negative Pullup',
						rep: 3,
					}
				]
			},
			2: {
				exercise_description: [
				'Start from top then slowly descend while counting 3 seconds',
				'Concentrate while you in descending position',
				'Focus on your forearm and back muscle burning'
				],
				shortenedSet: [7, 6, 5, 4, 4],
				set: [
					{
						exercise: 'Negative Pullup',
						rep: 7,
					}, 
					{
						exercise: 'Negative Pullup',
						rep: 6,
					},
					{
						exercise: 'Negative Pullup',
						rep: 5,
					},
					{
						exercise: 'Negative Pullup',
						rep: 4,
					},
					{
						exercise: 'Negative Pullup',
						rep: 4,
					}
				]
			},
			3: {
				exercise_description: [
				'Start from top then slowly descend while counting 3 seconds',
				'Concentrate while you in descending position',
				'Focus on your forearm and back muscle burning'
				],
				shortenedSet: [8, 6, 5, 5, 4],
				set: [
					{
						exercise: 'Negative Pullup',
						rep: 8,
					}, 
					{
						exercise: 'Negative Pullup',
						rep: 6,
					},
					{
						exercise: 'Negative Pullup',
						rep: 5,
					},
					{
						exercise: 'Negative Pullup',
						rep: 5,
					},
					{
						exercise: 'Negative Pullup',
						rep: 4,
					}
				]
			},
			4: {
				exercise_description: [
				'Start from top then slowly descend while counting 3 seconds',
				'Concentrate while you in descending position',
				'Focus on your forearm and back muscle burning'
				],
				shortenedSet: [8, 7, 5, 5, 5],
				set: [
					{
						exercise: 'Negative Pullup',
						rep: 8,
					}, 
					{
						exercise: 'Negative Pullup',
						rep: 7,
					},
					{
						exercise: 'Negative Pullup',
						rep: 5,
					},
					{
						exercise: 'Negative Pullup',
						rep: 5,
					},
					{
						exercise: 'Negative Pullup',
						rep: 5,
					}
				]
			},
			5: {shortenedSet: [9, 7, 6, 5, 5]},
			6: {shortenedSet: [10, 7, 6, 6, 5]},
			7: {shortenedSet: [10, 8, 6, 6, 6]},
			8: {shortenedSet: [11, 8, 7, 6, 6]},
			9: {shortenedSet: [12, 8, 7, 7, 6]},
			10: {shortenedSet: [12, 9, 7, 7, 7]}
		}
	},
	{
		name: 'Recon Ron - MIX',
		min: 2,
		max: 5,
		instruction: {
			title: 'Full Pullup Then Negative Pullup to achieve 5 pullups',
			exercise_description: [
				'Give your max strength to try full pullups. Then, do negative pullups for rest of reps',
				'Jump from bottom to touch chin on bar, then slowly descend while counting 3 seconds'
			]
		},
		sets: {
			1: {
				exercise_description: [
				'Start from top then slowly descend while counting 3 seconds',
				'Concentrate while you in descending position',
				'Focus on your forearm and back muscle burning'
				],
				set: [
					{
						exercise: 'Negative Pullup',
						rep: 6,
					}, 
					{
						exercise: 'Negative Pullup',
						rep: 5,
					},
					{
						exercise: 'Negative Pullup',
						rep: 5,
					},
					{
						exercise: 'Negative Pullup',
						rep: 4,
					},
					{
						exercise: 'Negative Pullup',
						rep: 3,
					}
				]
			},
			2: [7, 6, 5, 4, 4],
			3: [8, 6, 5, 5, 4],
			4: [8, 7, 5, 5, 5],
			5: [9, 7, 6, 5, 5],
			6: [10, 7, 6, 6, 5],
			7: [10, 8, 6, 6, 6],
			8: [11, 8, 7, 6, 6],
			9: [12, 8, 7, 7, 6],
			10: [12, 9, 7, 7, 7]
		}
	},
	{
		name: 'Recon Ron - TO THE TOP',
		min: 5,
		max: 30,
		instruction: {
			title: 'Push yourself to reach 30 pullups once with Recon Ron marine program.',
			exercise_description: [
				'you must start from a dead hang',
				'Grasp the bar with your palms facing forward or to the rear',
				'Your legs can be straight or bent but are not allowed to be above the waist',
				'Whipping, kicking, kipping, or any leg movement seen to assist with vertical progression is not allowed and if observed that pull-up will result in no count for that pull-up.'
			]
		},
		sets: {
			1: {
				title: "START IS HALF",
				type: 'Full Pullup Exercise',
				set: [6, 5, 5, 4, 3],
			},
			2: [7, 6, 5, 4, 4],
			3: [8, 6, 5, 5, 4],
			4: [8, 7, 5, 5, 5],
			5: [9, 7, 6, 5, 5],
			6: [10, 7, 6, 6, 5],
			7: [10, 8, 6, 6, 6],
			8: [11, 8, 7, 6, 6],
			9: [12, 8, 7, 7, 6],
			10: [12, 9, 7, 7, 7],
			11: [13, 9, 8, 7, 7],
			12: [14, 9, 8, 8, 7],
			13: [14, 10, 8, 8, 8],
			14: [15, 10, 9, 8, 8],
			15: [16, 10, 9, 9, 8],
			16: [16, 11, 9, 9, 9],
			17: [17, 11, 10, 9, 9],
			18: [18, 11, 10, 10, 9],
			19: [18, 12, 10, 10, 10],
			20: [19, 12, 11, 10, 10],
			21: [20, 12, 11, 11, 10],
			22: [20, 13, 11, 11, 11],
			23: [21, 13, 12, 11, 11],
			24: [21, 13, 12, 12, 11],
			25: [22, 14, 12, 12, 12],
			26: [23, 14, 13, 12, 12],
			27: [24, 14, 13, 13, 12],
			28: [24, 15, 13, 13, 13],
			29: [25, 15, 14, 13, 13],
			30: [26, 15, 14, 14, 13],
			31: [26, 16, 14, 14, 14],
			32: [27, 16, 15, 14, 14],
			33: [28, 16, 15, 15, 14],
			34: [28, 17, 15, 15, 15],
			35: [29, 17, 16, 15, 15],
			36: [30, 17, 16, 16, 15],
			37: [30, 18, 16, 16, 16],
			38: [31, 18, 17, 16, 16]
		}
	}
];

module.exports = programs;
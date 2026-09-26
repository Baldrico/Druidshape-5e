export const getModifier = num => Math.floor((num - 10) / 2);

export const crToNum = cr =>
	cr.toString().includes('/') ? 1 / parseInt(cr.split('/')[1]) : parseInt(cr);

export const filterBeasts = (beasts = [], character = {}, search = '', filters = {}) => {
	const { level = 1, isMoon = false, seen = {} } = character || {};

	let filtered = beasts.slice();
	if (level >= 2) {
		const maxCr = isMoon
			? level < 6
				? 1
				: Math.floor(level / 3)
			: level < 4
			? 1 / 4
			: level < 8
			? 1 / 2
			: 1;
		const canSwim = level >= 4;
		const canFly = level >= 8;
		const canElementalShape = isMoon && level >= 10;

		if (!canElementalShape) filtered = filtered.filter(b => b && b.type !== 'elemental');
		filtered = filtered.filter(b => b && (b.type === 'elemental' || crToNum(b.cr) <= maxCr));
		if (!canSwim) filtered = filtered.filter(b => b && !b.swim);
		if (!canFly) filtered = filtered.filter(b => b && !b.fly);
	}

	if (filters.seen) filtered = filtered.filter(b => b && seen && seen[b.name]);
	if (filters.movement) filtered = filtered.filter(b => b && b[filters.movement]);
	if (filters.environment)
		filtered = filtered.filter(
			b => b && Array.isArray(b.environments) && b.environments.includes(filters.environment)
		);
	if (search)
		filtered = filtered.filter(
			b => b && b.name && b.name.toLowerCase().includes(search.toLowerCase())
		);

	return filtered;
};

export const environments = [
	'Arctic',
	'Coastal',
	'Desert',
	'Forest',
	'Grassland',
	'Hill',
	'Mountain',
	'Swamp',
	'Underdark',
	'Underwater',
	'Urban'
];

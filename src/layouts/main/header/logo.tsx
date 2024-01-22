import { FC } from 'react';

const HeaderLogo: FC<{ className?: string }> = ({ className }) => {
	return <h3 className={`text-2xl font-bold text-primary ${className}`}>Sakurasou</h3>;
};

export { HeaderLogo };

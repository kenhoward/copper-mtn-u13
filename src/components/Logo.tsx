import Link from 'next/link';

interface LogoProps {
	mobile?: boolean;
}

const Logo = ({ mobile = false }: LogoProps) => {
	const fillColor = mobile ? '#FFF' : '#000';
	const width = mobile ? '50px' : '86.66pt';
	const height = mobile ? '60px' : '100pt';

	return (
		<Link href="/">
			<svg
				version="1.0"
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				viewBox="0 0 195 225"
				preserveAspectRatio="xMidYMid meet"
			>
				<g transform="translate(0.000000,225.000000) scale(0.100000,-0.100000)"
					fill={fillColor} stroke="none">
					<title>Crest of Copper Mountain Soccer</title>
					<path d="M332 1402 l3 -498 38 -76 c42 -86 142 -195 238 -261 48 -33 58 -45
                            73 -92 10 -33 33 -72 61 -103 110 -122 286 -132 407 -24 48 44 98 126 98 163
                            0 8 28 35 63 59 129 91 219 197 260 307 21 56 22 73 25 541 l3 482 -636 0
                            -636 0 3 -498z m1238 14 c0 -425 -1 -458 -20 -518 -21 -69 -58 -127 -124 -196
                            -48 -51 -150 -132 -165 -132 -6 0 -11 15 -11 33 0 79 -79 185 -168 228 -66 31
                            -168 31 -240 -1 -92 -40 -172 -153 -172 -242 l0 -29 -48 32 c-88 60 -186 170
                            -228 254 l-39 79 -3 473 -3 473 611 0 610 0 0 -454z m-485 -617 c7 -7 0 -8
                            -20 -3 -16 3 -34 11 -40 17 -7 6 0 7 20 3 17 -4 35 -12 40 -17z m-235 -24 c0
                            -13 -6 -28 -13 -32 -7 -4 -26 -25 -42 -45 -29 -37 -85 -68 -85 -47 0 22 31 67
                            74 107 52 48 66 52 66 17z m250 -20 c33 -17 57 -45 65 -75 5 -20 -1 -32 -24
                            -54 l-29 -28 -46 17 c-41 16 -46 22 -60 69 -15 49 -14 52 6 73 22 24 37 24 88
                            -2z m-162 -21 c27 -5 32 -12 42 -56 12 -48 11 -50 -18 -86 -16 -20 -36 -36
                            -43 -35 -108 13 -107 13 -119 49 -13 39 0 71 49 111 28 24 40 27 89 17z m277
                            -124 c14 -16 16 -29 11 -71 -8 -58 -28 -104 -49 -112 -8 -3 -27 7 -42 23 -25
                            26 -27 33 -20 77 5 36 14 55 38 75 39 33 39 33 62 8z m-332 -76 c41 -6 48 -11
                            68 -49 l22 -42 -23 -41 c-22 -39 -27 -42 -66 -42 -34 0 -47 5 -66 29 -14 15
                            -30 42 -37 59 -12 28 -11 34 9 62 23 33 25 33 93 24z m-150 -56 c7 -13 27 -46
                            44 -75 18 -29 25 -49 18 -47 -19 8 -63 67 -81 109 -16 39 -2 48 19 13z m391
                            -54 l28 -34 -35 -34 c-19 -18 -56 -39 -82 -46 -43 -12 -48 -12 -68 9 l-22 21
                            25 45 c21 38 33 48 70 60 57 17 50 19 84 -21z"/>
					<path d="M380 1794 c0 -34 4 -53 10 -49 6 3 10 22 10 41 l0 34 560 0 560 0 0
                            -34 c0 -18 6 -38 13 -44 9 -8 12 2 10 46 l-1 57 -581 3 -581 2 0 -56z"/>
					<path d="M429 1739 c-27 -10 -49 -46 -49 -78 0 -10 9 -30 21 -45 17 -22 28
                            -26 70 -26 37 0 54 5 71 22 l22 22 -22 9 c-17 8 -27 6 -41 -7 -13 -12 -27 -15
                            -41 -11 -17 5 -21 13 -18 43 2 30 7 38 26 40 13 2 29 -1 36 -7 14 -12 46 -5
                            46 9 0 28 -77 46 -121 29z"/>
					<path d="M624 1736 c-34 -15 -44 -33 -44 -75 0 -68 113 -99 165 -46 43 42 28
                            103 -29 125 -35 13 -54 12 -92 -4z m84 -67 c2 -27 -1 -38 -14 -43 -32 -12 -54
                            3 -54 38 0 40 7 48 40 44 21 -3 25 -9 28 -39z"/>
					<path d="M800 1665 l0 -75 30 0 c27 0 30 3 30 30 0 27 3 30 33 30 40 0 57 15
                            57 51 0 33 -14 39 -91 39 l-59 0 0 -75z m100 30 c0 -8 -9 -15 -19 -15 -10 0
                            -21 7 -25 15 -4 11 1 15 19 15 16 0 25 -6 25 -15z"/>
					<path d="M980 1665 l0 -75 30 0 c27 0 30 3 30 30 0 28 3 30 34 30 37 0 66 21
                            66 49 0 31 -22 41 -92 41 l-68 0 0 -75z m105 30 c0 -5 -10 -11 -22 -13 -16 -2
                            -23 2 -23 13 0 11 7 15 23 13 12 -2 22 -7 22 -13z"/>
					<path d="M1170 1665 l0 -75 75 0 c59 0 75 3 75 14 0 11 -14 16 -47 18 -35 2
                            -48 7 -48 18 0 11 11 15 43 14 34 -1 42 3 42 18 0 15 -8 18 -45 18 -25 0 -45
                            5 -45 10 0 6 23 10 50 10 38 0 50 4 50 15 0 12 -15 15 -75 15 l-75 0 0 -75z"/>
					<path d="M1357 1668 c1 -70 2 -73 27 -76 23 -3 26 0 26 27 0 39 13 39 40 1 15
                            -22 29 -30 51 -30 l30 0 -16 30 c-9 17 -21 30 -27 30 -7 0 -2 7 10 16 24 17
                            29 43 10 62 -7 7 -41 12 -82 12 l-71 0 2 -72z m101 30 c-7 -20 -48 -23 -48 -4
                            0 11 9 16 26 16 16 0 24 -5 22 -12z"/>
					<path d="M1530 1656 c0 -8 5 -18 10 -21 6 -3 10 3 10 14 0 12 -4 21 -10 21 -5
                            0 -10 -6 -10 -14z"/>
					<path d="M382 1254 l3 -339 27 -55 c32 -66 94 -140 166 -201 64 -53 72 -57 72
                            -30 0 37 43 115 90 162 159 159 442 95 520 -119 20 -54 25 -61 39 -50 119 92
                            187 174 221 264 19 52 20 76 21 367 l0 312 -567 3 c-411 1 -571 5 -581 14 -12
                            10 -14 -39 -11 -328z m84 271 c8 -31 22 -32 26 -2 2 16 11 23 31 25 27 3 27 2
                            27 -52 0 -43 -3 -56 -15 -56 -11 0 -15 11 -16 38 l-1 37 -12 -34 c-17 -47 -33
                            -50 -50 -9 l-14 33 -4 -30 c-2 -19 -9 -30 -18 -30 -11 0 -16 14 -18 53 -3 52
                            -3 52 27 52 24 0 32 -5 37 -25z m232 13 c21 -21 14 -66 -13 -84 -60 -39 -137
                            16 -100 72 12 19 24 24 58 24 24 0 48 -5 55 -12z m82 -28 c0 -33 3 -40 20 -40
                            17 0 20 7 20 40 0 36 3 40 25 40 22 0 25 -4 25 -35 0 -43 -29 -75 -68 -75 -41
                            0 -60 20 -64 68 -3 38 -1 42 19 42 20 0 23 -5 23 -40z m179 13 l20 -28 1 28
                            c0 20 5 27 20 27 18 0 20 -7 20 -55 0 -48 -3 -55 -19 -55 -11 0 -31 15 -45 33
                            l-26 32 0 -33 c0 -26 -4 -33 -17 -30 -14 2 -19 15 -21 56 -3 49 -2 52 22 52
                            15 0 32 -10 45 -27z m208 15 c-2 -7 -12 -13 -23 -13 -15 0 -20 -8 -22 -42 -3
                            -34 -7 -43 -22 -43 -15 0 -19 9 -22 43 -2 34 -6 41 -20 39 -11 -2 -18 3 -18
                            13 0 12 13 15 66 15 48 0 65 -3 61 -12z m108 -30 c9 -24 19 -49 22 -55 7 -17
                            -21 -17 -47 -1 -16 10 -24 10 -40 0 -22 -13 -54 -16 -48 -4 2 4 11 28 22 55
                            16 40 23 47 46 47 23 0 31 -7 45 -42z m85 -13 c0 -48 -2 -55 -20 -55 -18 0
                            -20 7 -20 55 0 48 2 55 20 55 18 0 20 -7 20 -55z m95 28 l24 -28 1 28 c0 20 5
                            27 20 27 17 0 20 -7 20 -50 0 -66 -21 -77 -61 -32 l-28 31 -3 -27 c-2 -16 -10
                            -28 -20 -30 -15 -3 -18 5 -18 52 0 50 2 56 20 56 12 0 32 -12 45 -27z m65
                            -319 c0 -207 -10 -314 -29 -314 -4 0 -26 16 -48 35 -35 30 -43 33 -53 20 -19
                            -23 -33 -18 -75 26 -22 23 -59 50 -82 60 -23 11 -56 37 -73 59 -36 45 -47 48
                            -82 20 l-25 -19 -69 59 c-38 33 -79 59 -90 60 -15 0 -45 -27 -94 -84 -76 -89
                            -86 -96 -127 -96 -16 0 -37 -13 -57 -34 -29 -32 -35 -34 -117 -39 -83 -6 -87
                            -5 -93 16 -3 12 -6 120 -6 240 l0 217 560 0 560 0 0 -226z m-612 -77 c3 -46
                            -10 -63 -22 -31 -5 13 -11 10 -35 -15 -16 -17 -33 -31 -39 -31 -5 0 -15 -12
                            -21 -27 -9 -22 -18 -28 -44 -29 -48 -1 -87 -13 -88 -27 0 -6 -16 -25 -34 -40
                            -30 -24 -36 -26 -54 -15 -15 9 -26 10 -38 3 -10 -6 -38 -8 -63 -5 l-45 5 38
                            14 c24 8 55 10 86 6 47 -6 48 -6 75 35 25 37 30 40 60 35 40 -8 71 15 147 111
                            28 36 56 63 63 61 6 -2 12 -25 14 -50z m212 -30 c0 -7 -9 -30 -19 -51 -11 -21
                            -17 -44 -14 -52 4 -12 -1 -14 -23 -12 -21 2 -31 -3 -41 -22 -9 -18 -13 -20
                            -13 -7 0 25 -13 21 -38 -13 -19 -26 -29 -30 -68 -30 -28 0 -43 4 -39 10 3 6
                            15 10 26 10 11 0 39 21 62 46 23 25 61 57 85 71 23 14 47 34 53 44 11 22 29
                            25 29 6z m62 -186 c-15 -21 -28 -26 -68 -28 l-49 -3 35 13 c19 6 39 22 46 34
                            6 13 19 32 30 44 l19 21 3 -27 c2 -17 -4 -39 -16 -54z m228 4 c0 -17 -30 -35
                            -57 -35 -14 1 -12 6 12 25 35 29 45 31 45 10z m-680 -65 c-10 -29 -18 -40 -31
                            -38 -10 2 -31 -10 -47 -25 -22 -21 -37 -28 -58 -25 l-29 4 28 12 c15 6 30 18
                            33 26 3 8 24 27 47 42 23 15 46 33 50 41 16 27 20 3 7 -37z"/>
					<path d="M627 1524 c-4 -4 -7 -18 -7 -31 0 -20 5 -24 23 -21 16 2 22 10 22 28
                            0 24 -23 39 -38 24z"/>
					<path d="M1220 1500 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
                            -10 -4 -10 -10z"/>
					<path d="M486 1394 c-9 -8 -16 -18 -16 -22 1 -18 22 -38 51 -47 38 -13 50 -35
                            20 -35 -12 0 -21 5 -21 10 0 6 -11 10 -25 10 -28 0 -31 -8 -12 -34 19 -26 95
                            -26 114 0 27 37 14 63 -39 80 -16 5 -27 14 -25 19 1 6 7 8 12 6 34 -13 55 -12
                            55 2 0 30 -87 38 -114 11z"/>
					<path d="M646 1388 c-34 -48 -11 -121 40 -131 35 -6 82 10 94 33 16 31 11 79
                            -10 100 -29 29 -103 28 -124 -2z m82 -20 c28 -28 2 -88 -33 -74 -15 5 -22 66
                            -8 79 10 11 28 8 41 -5z"/>
					<path d="M826 1388 c-39 -55 -7 -129 56 -131 34 -1 78 24 78 43 0 17 -34 19
                            -51 4 -27 -24 -49 -11 -49 30 0 42 14 53 45 36 13 -7 31 -10 41 -6 16 6 16 8
                            -1 26 -26 29 -98 28 -119 -2z"/>
					<path d="M997 1392 c-10 -11 -17 -35 -17 -59 0 -49 27 -77 75 -77 31 0 75 26
                            75 45 0 18 -42 20 -54 3 -21 -28 -46 -11 -46 31 0 38 22 57 43 36 15 -15 47
                            -14 47 2 0 39 -92 53 -123 19z"/>
					<path d="M1150 1335 l0 -75 65 0 c51 0 65 3 65 15 0 11 -11 15 -40 15 -29 0
                            -40 4 -40 15 0 10 11 15 35 15 28 0 35 4 35 20 0 16 -7 20 -35 20 -19 0 -35 5
                            -35 10 0 6 18 10 40 10 29 0 40 4 40 15 0 12 -14 15 -65 15 l-65 0 0 -75z"/>
					<path d="M1310 1335 c0 -73 1 -75 24 -75 20 0 25 6 28 33 l4 32 19 -32 c15
                            -25 27 -33 48 -33 l29 0 -20 34 c-18 30 -19 36 -6 47 17 14 18 41 2 57 -7 7
                            -38 12 -70 12 l-58 0 0 -75z m88 33 c-7 -19 -38 -22 -38 -4 0 10 9 16 21 16
                            12 0 19 -5 17 -12z"
					/>
				</g>
			</svg>
		</Link>
	);
};

export default Logo;

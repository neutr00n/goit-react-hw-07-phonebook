import { Oval } from 'react-loader-spinner';

export const Loader = ({ size, stroke }) => {
  return (
    <Oval
      height={size}
      width={size}
      wrapperStyle={{ justifyContent: 'center' }}
      color="#4fa94d"
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={stroke}
      strokeWidthSecondary={stroke}
    />
  );
};

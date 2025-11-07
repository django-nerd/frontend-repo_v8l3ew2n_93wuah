import React from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineAura() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

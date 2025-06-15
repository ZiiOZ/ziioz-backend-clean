import React from 'react';

interface Props {
  imageUrl?: string;
  alt?: string;
  size?: number;
}

export default function UserAvatar({ imageUrl, alt = "Profile", size = 40 }: Props) {
  return (
    <img
      src={imageUrl || '/default-avatar.png'}
      alt={alt}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}

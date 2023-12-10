import React from 'react';
import StarsLine from '@/components/feedback/StarsLine';

export default function Feedback() {
    return (
        <div>
            <StarsLine totalStar={5} currentStar={1} isEditable={true} size="lg"/><br/>
            <StarsLine totalStar={5} currentStar={1} isEditable={true} size="lg"/><br/>
            <StarsLine totalStar={5} currentStar={1} isEditable={true} size="lg"/><br/>
            <StarsLine totalStar={5} currentStar={1} isEditable={true} size="lg"/><br/>
            <StarsLine totalStar={5} currentStar={1} isEditable={true} size="lg"/>
        </div>
    );
}

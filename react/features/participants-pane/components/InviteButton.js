// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { createToolbarEvent, sendAnalytics } from '../../analytics';
import { Icon, IconInviteMore } from '../../base/icons';
import { beginAddPeople } from '../../invite';

import { ParticipantInviteButton , ParticipantAddButton, ParticipantGroupButton } from './styled';

export const InviteButton = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onInvite = useCallback(() => {
        sendAnalytics(createToolbarEvent('invite'));
        dispatch(beginAddPeople());
    }, [ dispatch ]);

    const onAdd = () => {
        parent.postMessage("myevent", "*")
    };

    const onGroupAdd = () => {
        parent.postMessage("mygroup", "*")
    };

    return (
        <>
        <ParticipantInviteButton
            aria-label = { t('participantsPane.actions.invite') }
            onClick = { onInvite }>
            <Icon
                size = { 20 }
                src = { IconInviteMore } />
            <span>{t('participantsPane.actions.invite')}</span>
        </ParticipantInviteButton>
        
        <ParticipantAddButton
            aria-label = "Add Someone"
            onClick = { onAdd }>
            <Icon
                size = { 20 }
                src = { IconInviteMore } />
            <span>Add Someone</span>
        </ParticipantAddButton>
        {window.conversation_type =='group' ? 
        <ParticipantGroupButton id = "add_member_group" 
            aria-label = "Add Group Member"
            onClick = { onGroupAdd }>
            <Icon
                size = { 20 }
                src = { IconInviteMore } />
            <span>Add Group Member</span>
        </ParticipantGroupButton>
        : ''}

        </>
    );
};

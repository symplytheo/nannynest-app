import React, { useState } from "react";
import { ScrollView } from "react-native";
import NannyActiveState from "~/components/orders/states/nanny-active-state";
import NannyEmptyState from "~/components/orders/states/nanny-empty-state";
import { MOCK_NANNY_ONGOING_ORDER, type NannyOngoingOrder } from "~/constants/orders";

type NannyOngoingTabProps = {
  onChatOpen: () => void;
};

export default function NannyOngoingTab({ onChatOpen }: NannyOngoingTabProps) {
  const [ongoingOrder] = useState<NannyOngoingOrder | null>(MOCK_NANNY_ONGOING_ORDER);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {!ongoingOrder ? (
        <NannyEmptyState onChatOpen={onChatOpen} />
      ) : (
        <NannyActiveState order={ongoingOrder} onChatOpen={onChatOpen} />
      )}
    </ScrollView>
  );
}

export const getDeliveryStatusText = (status) => {
  switch (status) {
    case "PENDING":
      return "대기 중";
    case "PREPARING":
      return "준비 중";
    case "SHIPPED":
      return "배송 중";
    case "DELIVERED":
      return "배송 완료";
    default:
      return "알 수 없음";
  }
};

// 상태를 한글 문자열로 매핑하는 함수
export const getOrderStatusText = (status) => {
  switch (status) {
    case "ORDER_PLACED":
      return "주문 완료";
    case "CANCEL_REQUESTED":
      return "취소 요청됨";
    case "CANCEL_COMPLETED":
      return "취소 완료";
    default:
      return "알 수 없음";
  }
};

export const formatDate = (date) => {
  const formattedDate = new Date(date);
  return `${formattedDate.getFullYear()}년 ${
    formattedDate.getMonth() + 1
  }월 ${formattedDate.getDate()}일`;
};

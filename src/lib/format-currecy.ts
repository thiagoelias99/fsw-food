export function formatCurrency(value: number) {
  return `R$ ${Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(value)}`
}
import { COLORS } from '../../styles/theme';

export function Header({ title, badge }) {
  return (
    <div style={{
      background: COLORS.headerBg,
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          background: COLORS.activeBlue,
          width: '36px',
          height: '36px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          color: '#fff',
          fontSize: '14px'
        }}>BIL</div>
        <div style={{ color: '#e8ecf2', fontSize: '15px', fontWeight: 600 }}>
          {title}
        </div>
      </div>
      {badge && (
        <div style={{
          background: COLORS.TEC,
          padding: '6px 18px',
          borderRadius: '4px',
          color: '#fff',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.5px'
        }}>{badge}</div>
      )}
    </div>
  );
}

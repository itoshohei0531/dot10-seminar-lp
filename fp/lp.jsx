// lp.jsx — FP対談版 セミナーLP（/fp/ 配下にデプロイ）
// ベース：通常版LP（コンプライアンス対応済み）からの派生
// Single-page React component, in-browser Babel compiled.
//
// ★ 公開前チェックリスト（プレースホルダー）
//   1. LINE_URL … FP対談回専用のLステップ流入経路リンクに差し替え（計測分離のため必須）
//   2. FP_NAME / FP_NAME_EN / FP_PROFILE … FPの氏名・プロフィールを入力
//   3. assets/instructor-fp.png … FPの写真を配置（それまではダミー背景が表示される）
//   4. EVENT_DATE … 開催日時を入力
//
// アセットパスは /fp/ 配下から親のassetsを参照するため「../assets/」を使用。
// ルート直下に置く場合は「assets/」に戻すこと。

// ★★★ 要差し替え：FP対談回専用のLステップリンクを発行して設定 ★★★
const LINE_URL = 'https://s.lmes.jp/landing-qr/2009498784-C1pQAyaB?uLand=nHN4WV';

// ★ プレースホルダー：FP情報
const FP_NAME    = '';           // 例：'山田 太郎'
const FP_NAME_EN = 'FINANCIAL PLANNER'; // 例：'TARO YAMADA'
const FP_PROFILE = 'プロフィール文がここに入ります。プロフィール文がここに入ります。プロフィール文がここに入ります。'; // ダミー

// ★ プレースホルダー：開催日時
const EVENT_DATE = '近日公開（日程は公式LINEでご案内します）'; // 例：'2026年8月◯日（◯）20:00〜21:00'

const ASSET = '../assets/'; // /fp/ 配下から親ディレクトリのassetsを参照

const W_FONT = "'Noto Sans JP',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif";

const COL = {
  surface:  '#ffffff',
  surface2: '#f1f1f3',
  ink:      '#1a1815',
  inkSoft:  '#4a4640',
  inkMute:  '#8d877c',
  rule:     '#dcdcdc',
  ruleSoft: '#e8e8e8',
  card:     '#ffffff',
  redIni:   '#6a0d1a',
};

function WPage({ children, accent = COL.redIni, bg = COL.surface }) {
  return (
    <div style={{
      width: '100%', maxWidth: 580, margin: '0 auto',
      background: bg, color: COL.ink,
      fontFamily: W_FONT, fontSize: 14, lineHeight: 1.7,
      ['--accent']: accent,
      letterSpacing: '.01em',
      position: 'relative',
      boxShadow: '0 0 30px rgba(0,0,0,.18)',
    }}>
      {children}
    </div>
  );
}

// ── Header ───────────────────────────────────────────────────────────
function WNav() {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'flex-start',
      padding:'14px 18px',
      background:'linear-gradient(90deg, #050507 0%, #16080a 30%, #4a0a14 75%, #6a0d1a 100%)',
      color:'#fff',
    }}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <img src={ASSET + 'dot10-logo.png'} alt="Dot.10"
          style={{height:36, width:'auto', display:'block'}}/>
      </div>
    </div>
  );
}

// ── Section wrapper ──────────────────────────────────────────────────
function WSection({ children, heading, bg, pt=36, pb=36 }) {
  return (
    <section style={{padding:`${pt}px 22px ${pb}px`, background:bg, position:'relative', overflow:'hidden'}}>
      {heading && <WSectionLabel>{heading}</WSectionLabel>}
      {children}
    </section>
  );
}

function WSectionLabel({ children }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:14,
      margin:'0 0 18px', color:COL.ink,
    }}>
      <div style={{flex:1, height:1, background:COL.rule}}/>
      <div style={{fontSize:13, fontWeight:600, letterSpacing:'.2em'}}>{children}</div>
      <div style={{flex:1, height:1, background:COL.rule}}/>
    </div>
  );
}

// ── Hero 4-up photo grid ─────────────────────────────────────────────
const HERO_PORTRAITS = [
  { url: ASSET + 'hero-50f.png', pos: '50% 30%', bg: 'linear-gradient(135deg,#d8c2a3,#a88a64)' },
  { url: ASSET + 'hero-50m.png', pos: '60% 40%', bg: 'linear-gradient(135deg,#bdc6b3,#7c8a72)' },
  { url: ASSET + 'hero-30f.png', pos: '50% 30%', bg: 'linear-gradient(135deg,#d4c1cb,#9d8696)' },
  { url: ASSET + 'hero-30m.png', pos: '50% 35%', bg: 'linear-gradient(135deg,#b6c1cc,#7a8a99)' },
];

function WHero4() {
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr',
      gap:1, overflow:'hidden', background:'rgba(0,0,0,.05)',
      boxShadow:'inset 0 0 40px rgba(0,0,0,.06)',
      margin: '0 auto',
    }}>
      {HERO_PORTRAITS.map((p,i)=>(
        <div key={i} style={{position:'relative', overflow:'hidden', background: p.bg, aspectRatio:'1 / 1'}}>
          <div style={{
            position:'absolute', inset:0,
            backgroundImage: `url("${p.url}")`,
            backgroundSize: 'cover',
            backgroundPosition: p.pos || 'center',
            filter: 'saturate(.94) contrast(1.02) brightness(1.02)',
          }}/>
          <div style={{
            position:'absolute', inset:0,
            background: 'linear-gradient(180deg, rgba(255,240,210,.05) 0%, transparent 50%, rgba(40,25,15,.18) 100%)',
          }}/>
        </div>
      ))}
    </div>
  );
}

// ── CTA — LINE button, wrapped in clickable link ─────────────────────
function WCta({ big=false, sub }) {
  // 中間LP方式：LINEボタンのクリックをLead（コンバージョン）として計測
  const handleClick = () => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }
  };
  return (
    <div style={{textAlign:'center', margin:'14px 0'}}>
      <a href={LINE_URL} target="_blank" rel="noopener noreferrer" onClick={handleClick}
         style={{display:'inline-block', width:'100%', textDecoration:'none'}}>
        <img
          src={ASSET + 'line-button.png'}
          alt="公式LINEに登録する"
          style={{
            display:'block', margin:'0 auto',
            width: big ? '92%' : '88%',
            maxWidth: big ? 360 : 320,
            height:'auto',
            filter:'drop-shadow(0 2px 4px rgba(0,0,0,.12))',
            cursor:'pointer',
          }}
        />
      </a>
      {sub && <div style={{fontSize:11, color:COL.inkMute, marginTop:12, letterSpacing:'.04em'}}>{sub}</div>}
    </div>
  );
}

// ── Headline helpers ─────────────────────────────────────────────────
function WEyebrow({ children }) {
  return (
    <div style={{
      display:'inline-block', color:'var(--accent)',
      fontSize:12, fontWeight:600, letterSpacing:'.2em', marginBottom:16,
    }}>— {children}</div>
  );
}

function WH1({ children, size=28 }) {
  return (
    <h1 style={{
      fontSize:size, fontWeight:700, lineHeight:1.45,
      margin:'0 0 14px', letterSpacing:'.04em', fontFamily:W_FONT,
    }}>{children}</h1>
  );
}

// ── Pain list ────────────────────────────────────────────────────────
function WCheck({ children }) {
  return (
    <div style={{display:'flex', gap:14, alignItems:'flex-start', padding:'14px 0',
      borderBottom:`1px solid ${COL.ruleSoft}`}}>
      <div style={{
        width:24, height:24, border:`1px solid ${COL.ink}`, flexShrink:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        color:'var(--accent)', fontWeight:700, fontSize:14, lineHeight:1,
      }}>✓</div>
      <div style={{fontSize:14, lineHeight:1.7, paddingTop:1}}>{children}</div>
    </div>
  );
}

// ── Box wrapper ──────────────────────────────────────────────────────
function WBox({ children, style={} }) {
  return (
    <div style={{
      border:`1px solid ${COL.rule}`,
      background:COL.card,
      padding:'16px 16px',
      ...style,
    }}>{children}</div>
  );
}

// ── Stats banner ─────────────────────────────────────────────────────
function WStatsBanner() {
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'1fr 1px 1fr', gap:0,
      padding:'28px 8px', background:COL.redIni, color:'#fff',
    }}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:42, fontWeight:600, color:'#fff', lineHeight:1, letterSpacing:'.02em'}}>
          35<span style={{fontSize:14, marginLeft:3}}>件</span>
        </div>
        <div style={{fontSize:10, color:'rgba(255,255,255,.75)', marginTop:10, letterSpacing:'.15em', lineHeight:1.6}}>過去1年間の<br/>口座開設サポート実績<br/><span style={{fontSize:8, opacity:.7, letterSpacing:'.05em'}}>※法人・個人を含む</span></div>
      </div>
      <div style={{background:'rgba(255,255,255,.18)'}}/>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:42, fontWeight:600, color:'#fff', lineHeight:1, letterSpacing:'.02em'}}>
          1<span style={{fontSize:14, marginLeft:3}}>ヶ月以内</span>
        </div>
        <div style={{fontSize:10, color:'rgba(255,255,255,.75)', marginTop:10, letterSpacing:'.15em', lineHeight:1.6}}>日本にいながら<br/>口座開設までの目安<br/><span style={{fontSize:8, opacity:.7, letterSpacing:'.05em'}}>※お手続きの状況により前後します</span></div>
      </div>
    </div>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────────
function WFaq({ q, a }) {
  return (
    <div style={{
      border:`1px solid ${COL.rule}`, borderRadius:6,
      padding:'18px 18px', marginBottom:14, background:'#fff',
    }}>
      <div style={{display:'flex', gap:14, alignItems:'flex-start'}}>
        <span style={{
          width:26, height:26, borderRadius:'50%', background:'#6a0d1a', color:'#fff',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:12, fontWeight:700, flexShrink:0, marginTop:1,
        }}>Q</span>
        <span style={{flex:1, fontSize:14, fontWeight:700, color:'#6a0d1a', lineHeight:1.6, paddingTop:3}}>{q}</span>
      </div>
      {a && (
        <div style={{display:'flex', gap:14, marginTop:12, alignItems:'flex-start'}}>
          <span style={{
            width:26, height:26, borderRadius:'50%', background:'#3fa66b', color:'#fff',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:12, fontWeight:700, flexShrink:0, marginTop:1,
          }}>A</span>
          <span style={{flex:1, fontSize:13, color:COL.ink, lineHeight:1.85, paddingTop:3}}>{a}</span>
        </div>
      )}
    </div>
  );
}

// ── Speaker card（対談用：2名掲載）─────────────────────────────────
function WSpeaker({ role, nameEn, name, photo, photoDummy, profile }) {
  return (
    <div style={{marginBottom:26}}>
      <div style={{
        display:'inline-block', fontSize:10, fontWeight:700, letterSpacing:'.2em',
        color:'#fff', background:'var(--accent)', padding:'4px 12px', marginBottom:14,
      }}>{role}</div>
      <div style={{display:'flex', gap:20, alignItems:'flex-start'}}>
        <div style={{
          width:120, height:148, flexShrink:0, position:'relative', overflow:'hidden',
          background:'linear-gradient(135deg,#c8b89b,#8a795e)',
        }}>
          {photo && (
            <div style={{
              position:'absolute', inset:0,
              backgroundImage:`url("${photo}")`,
              backgroundSize:'cover',
              backgroundPosition:'50% 25%',
              filter:'saturate(.95) contrast(1.03)',
            }}/>
          )}
          {photoDummy && (
            <div style={{
              position:'absolute', inset:0, display:'flex',
              alignItems:'center', justifyContent:'center',
              color:'rgba(255,255,255,.85)', fontSize:10, letterSpacing:'.15em',
              textAlign:'center', lineHeight:1.8,
            }}>PHOTO<br/>（写真配置<br/>スペース）</div>
          )}
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 70%, rgba(0,0,0,.18))'}}/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:11, color:'var(--accent)', letterSpacing:'.15em', marginBottom:6}}>{nameEn}</div>
          <div style={{fontSize:18, fontWeight:600, marginBottom:12, letterSpacing:'.04em', minHeight:'1.5em'}}>
            {name || <span style={{color:COL.inkMute, fontSize:13}}>（お名前が入ります）</span>}
          </div>
          <div style={{fontSize:13, color:COL.ink, lineHeight:1.95}}>{profile}</div>
        </div>
      </div>
    </div>
  );
}

// ── Seminar details table ────────────────────────────────────────────
function WDetails() {
  const rows = [
    ['開催日時', EVENT_DATE],
    ['形式', 'ファイナンシャルプランナーを迎えた特別対談（60分）'],
    ['開催方法', 'オンライン'],
    ['参加費', '無料'],
  ];
  return (
    <div style={{borderTop:`1px solid ${COL.ink}`}}>
      {rows.map(([k,v],i)=>(
        <div key={i} style={{
          display:'flex', padding:'14px 4px',
          borderBottom: `1px solid ${i===rows.length-1?COL.ink:COL.ruleSoft}`,
          fontSize:13,
        }}>
          <div style={{width:90, color:COL.inkSoft, fontWeight:600, letterSpacing:'.1em', flexShrink:0}}>{k}</div>
          <div style={{flex:1, color:COL.ink}}>{v}</div>
        </div>
      ))}
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────
function LP() {
  return (
    <WPage>
      <WNav/>

      {/* HERO */}
      <WSection pt={36} pb={14}>
        <WEyebrow>特別対談企画｜FPゲスト回</WEyebrow>
        <WH1 size={28}>ファイナンシャル<br/>プランナーが語る、<br/><span style={{color:'var(--accent)'}}>ジョージアの銀行口座</span>開設。</WH1>
        <div style={{fontSize:13, color:COL.inkSoft, marginBottom:24, lineHeight:1.9}}>
          お金の専門家をゲストに迎え、<b style={{color:COL.ink}}>海外に口座を持つという選択肢</b>を対談形式で掘り下げます。<br/>
          オンライン無料セミナー / 60分完結 / 海外口座が初めての方OK
        </div>
        <WHero4/>
        <div style={{height:28}}/>
        <WCta sub={<span style={{color:COL.inkSoft, fontSize:12, letterSpacing:'.04em'}}>開催日程・参加方法はLINEでご案内します</span>}/>
      </WSection>

      {/* PAIN */}
      <WSection heading="こんなお悩み、ありませんか" pt={14} pb={32}>
        <div>
          <WCheck>資産が日本円だけに偏っていることが、なんとなく気になっている</WCheck>
          <WCheck>海外口座の話は聞くけれど、専門家の意見も聞いてみたい</WCheck>
          <WCheck>言葉や手続きが不安で、何から始めればいいか分からない</WCheck>
          <WCheck>身近に、海外口座やお金の話を相談できる人がいない</WCheck>
        </div>
      </WSection>

      {/* SOLUTION INTRO */}
      <WSection pt={32} pb={32} bg={COL.surface2}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:11, color:COL.inkMute, letterSpacing:'.25em', marginBottom:18}}>そんなあなたへ</div>
          <div style={{fontSize:22, fontWeight:600, lineHeight:1.7, letterSpacing:'.05em'}}>
            気になる疑問を、<br/>
            <span style={{color:'var(--accent)'}}>お金の専門家</span>と一緒に。<br/>
            <span style={{fontSize:13, color:COL.inkSoft, fontWeight:400, letterSpacing:'.05em'}}>対談形式だから、リアルな話が聞けます。</span>
          </div>
        </div>
      </WSection>

      {/* PROGRAM（対談テーマ） */}
      <WSection heading="対談テーマ" pt={32} pb={32}>
        {[
          ['01','なぜいま、海外口座に注目が集まるのか','資産の置き場所の考え方を、FPの視点から'],
          ['02','ジョージアの銀行口座、実際どうなのか','参加者が気になる疑問を、対談形式で率直に深掘り'],
          ['03','口座開設のリアルな手順','つまずきやすいポイントと、安全な進め方'],
        ].map(([n,t,d])=>(
          <div key={n} style={{
            display:'flex', gap:18, padding:'22px 0',
            borderTop: n==='01'?`1px solid ${COL.ink}`:`1px solid ${COL.ruleSoft}`,
            borderBottom: n==='03'?`1px solid ${COL.ink}`:'none',
          }}>
            <div style={{
              fontSize:12, fontWeight:600, color:'var(--accent)',
              letterSpacing:'.2em', paddingTop:4, width:30, flexShrink:0,
            }}>{n}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:600, fontSize:16, marginBottom:6, letterSpacing:'.04em'}}>{t}</div>
              <div style={{fontSize:12, color:COL.inkSoft, lineHeight:1.8}}>{d}</div>
            </div>
          </div>
        ))}
        <div style={{fontSize:10, color:COL.inkMute, marginTop:14, lineHeight:1.8}}>
          ※対談内容は、海外口座に関する一般的な情報提供を目的としたものです。特定の金融商品・サービスの勧誘を目的とするものではありません。
        </div>
      </WSection>

      {/* PROOF */}
      <WSection heading="選ばれている理由" pt={28} pb={32}>
        <WStatsBanner/>
        <div style={{textAlign:'center', fontSize:12, color:COL.inkSoft, marginTop:22, lineHeight:1.8}}>
          法人・個人合わせ、これまでに多くの方の<br/>口座開設をサポートしてきました。
        </div>
      </WSection>

      {/* SPEAKERS（対談登壇者：2名） */}
      <WSection heading="登壇者紹介" pt={32} pb={32} bg={COL.surface2}>
        <WSpeaker
          role="GUEST"
          nameEn={FP_NAME_EN}
          name={FP_NAME}
          photoDummy={true}
          profile={FP_PROFILE}
        />
        <WSpeaker
          role="HOST"
          nameEn="SUBARU SETO"
          name="瀬戸 統晴"
          photo={ASSET + 'instructor-seto.png'}
          profile={<>ノマドという働き方に憧れてジョージアに渡航。<br/>現地の暮らしやすさに惹かれ、多くの人にその魅力を知ってほしいという想いでDot.10の事業に参画。</>}
        />
      </WSection>

      {/* VOICES */}
      <WSection heading="お客様の声" pt={32} pb={32}>
        <WVoice
          photo={ASSET + 'voice-2.png'}
          meta="愛知県・32歳・女性｜デザイナー"
          text={`海外クライアントが増え、
日本の銀行だと送金手数料が負担でした。
ジョージアの銀行口座を持つことで、
海外送金もスムーズになり、
余計なコストを抑えられています。
毎月発生するコストなので
長い目でみると
口座開設して本当に良かったです。`}
        />
        <WVoice
          photo={ASSET + 'voice-3.png'}
          meta="広島県・38歳・男性｜個人投資家"
          text={`無事に口座開設まで完了しました!
海外の銀行と聞くと手続きが大変そうなイメージでしたが、日本語のサポートのおかげで想像以上にスムーズでした。
日本にいながらここまでできるのかと驚きましたし、海外資産ってこんなに身近なんだと感じました。選択肢が広がった実感があります。`}
        />
        <WVoice
          photo={ASSET + 'voice-1.png'}
          meta="東京都・45歳・男性｜製造業経営者"
          text={`ジョージアの銀行口座開設は正直不安がありましたが、最初のヒアリングから書類準備、提出まで丁寧にサポートいただき、ストレスなく進めることができました。こちらのスピードに合わせてもらえた点も助かりましたし、なにより“海外口座を持つ”という選択肢が、これからの会社の資産防衛につながるという手応えがあります。`}
        />
      </WSection>

      {/* DETAILS */}
      <WSection heading="セミナー開催概要" pt={28} pb={32} bg={COL.surface2}>
        <WDetails/>
      </WSection>

      {/* MID CTA */}
      <WSection pt={24} pb={14}>
        <WCta big sub={<span style={{color:COL.inkSoft, fontSize:12, letterSpacing:'.04em'}}>開催日程・参加方法はLINEでご案内します</span>}/>
      </WSection>

      {/* FAQ */}
      <WSection heading="よくあるご質問" pt={14} pb={36}>
        <WFaq
          q="対談を聞くだけの参加でも大丈夫ですか？"
          a={<>もちろんです。カメラ・マイクはオフのまま、視聴のみでご参加いただけます。<br/>質問がある方は、チャットからお送りいただけます。</>}
        />
        <WFaq
          q="英語やジョージア語が話せなくても大丈夫ですか？"
          a={<>問題ありません。全サービスは日本語でご案内可能です。<br/>現地サポートもついており、言語に不安がある方でも安心してご利用いただけます。</>}
        />
        <WFaq
          q="ビザは必要ですか？"
          a={<>日本国籍の方は、ジョージアに1年間ビザ不要で滞在できます。<br/>法人設立や長期滞在にあたって、必要に応じて最適なビザアドバイスも行っております。</>}
        />
      </WSection>

      {/* FINAL CTA */}
      <WSection pt={36} pb={48} bg={COL.redIni}>
        <div style={{color:'#fff', textAlign:'center'}}>
          <div style={{fontSize:11, color:'#fff', letterSpacing:'.25em', marginBottom:14}}>JOIN US</div>
          <div style={{fontSize:24, fontWeight:600, marginBottom:24, lineHeight:1.55, letterSpacing:'.05em'}}>
            まずは公式LINEへ。
          </div>
          <WCta big sub={<span style={{color:'#fff',opacity:.9, fontSize:12, letterSpacing:'.04em'}}>開催日程・参加方法はLINEでご案内します</span>}/>
        </div>
      </WSection>
    </WPage>
  );
}

// ── Voice card ───────────────────────────────────────────────────────
function WVoice({ photo, meta, text }) {
  return (
    <WBox style={{marginBottom:16, padding:'22px 18px'}}>
      <div style={{display:'flex', gap:14, alignItems:'center', marginBottom:14}}>
        {photo && (
          <div style={{
            width:60, height:60, borderRadius:'50%', overflow:'hidden', flexShrink:0,
            background:'#e5dfd1',
          }}>
            <img src={photo} alt="" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}/>
          </div>
        )}
        <div style={{fontSize:12, fontWeight:700, letterSpacing:'.05em', color:COL.ink, lineHeight:1.5}}>
          {meta}
        </div>
      </div>
      <div style={{fontSize:13, lineHeight:1.95, color:COL.ink, whiteSpace:'pre-line'}}>{text}</div>
    </WBox>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<LP/>);

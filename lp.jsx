// lp.jsx — Production LP code for dot10llc.com セミナーLP
// Single-page React component, in-browser Babel compiled.
// All target the LINE registration URL.

const LINE_URL = 'https://s.lmes.jp/landing-qr/2009498784-C1pQAyaB?uLand=nHN4WV';

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
        <img src="assets/dot10-logo.png" alt="Dot.10"
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
  { url: 'assets/hero-50f.png', pos: '50% 30%', bg: 'linear-gradient(135deg,#d8c2a3,#a88a64)' },
  { url: 'assets/hero-50m.png', pos: '60% 40%', bg: 'linear-gradient(135deg,#bdc6b3,#7c8a72)' },
  { url: 'assets/hero-30f.png', pos: '50% 30%', bg: 'linear-gradient(135deg,#d4c1cb,#9d8696)' },
  { url: 'assets/hero-30m.png', pos: '50% 35%', bg: 'linear-gradient(135deg,#b6c1cc,#7a8a99)' },
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
          src="assets/line-button.png"
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
        <div style={{fontSize:10, color:'rgba(255,255,255,.75)', marginTop:10, letterSpacing:'.15em', lineHeight:1.6}}>過去1年間の<br/>口座開設数</div>
      </div>
      <div style={{background:'rgba(255,255,255,.18)'}}/>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:42, fontWeight:600, color:'#fff', lineHeight:1, letterSpacing:'.02em'}}>
          100<span style={{fontSize:14, marginLeft:3}}>%</span>
        </div>
        <div style={{fontSize:10, color:'rgba(255,255,255,.75)', marginTop:10, letterSpacing:'.15em', lineHeight:1.6}}>口座開設成功率<br/><span style={{fontSize:8, opacity:.7, letterSpacing:'.05em'}}>※法人・個人を含む</span></div>
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

// ── Seminar details table ────────────────────────────────────────────
function WDetails() {
  const rows = [
    ['開催日時', '最新日程を公式LINEで公開中'],
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
          <div style={{width:90, color:COL.inkSoft, fontWeight:600, letterSpacing:'.1em'}}>{k}</div>
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
        <WEyebrow>1時間のセミナーで全てがわかる</WEyebrow>
        <WH1 size={30}>まだ遅くない、<br/>預けるだけで<br/><span style={{color:'var(--accent)'}}>年利10%</span>のしくみ。</WH1>
        <div style={{fontSize:13, color:COL.inkSoft, marginBottom:24, lineHeight:1.9}}>
          投資ではなく、<b style={{color:COL.ink}}>銀行への預金</b>で年利10%。<br/>
          オンライン無料セミナー / 60分完結 / 投資未経験OK
        </div>
        <WHero4/>
        <div style={{height:28}}/>
        <WCta sub={<span style={{color:COL.inkSoft, fontSize:12, letterSpacing:'.04em'}}>最新情報／セミナー日程はLINEで公開中</span>}/>
      </WSection>

      {/* PAIN */}
      <WSection heading="こんなお悩み、ありませんか" pt={14} pb={32}>
        <div>
          <WCheck>銀行に預けても、ほとんど増えない</WCheck>
          <WCheck>投資はリスクが怖くて、手を出せない</WCheck>
          <WCheck>将来のお金が漠然と不安だが、何から始めればいいか分からない</WCheck>
          <WCheck>身近に、お金の話を相談できる人がいない</WCheck>
        </div>
      </WSection>

      {/* SOLUTION INTRO */}
      <WSection pt={32} pb={32} bg={COL.surface2}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:11, color:COL.inkMute, letterSpacing:'.25em', marginBottom:18}}>そんなあなたへ</div>
          <div style={{fontSize:22, fontWeight:600, lineHeight:1.7, letterSpacing:'.05em'}}>
            投資ではなく、<br/>
            <span style={{color:'var(--accent)'}}>「預金」</span>で年利10%。<br/>
            <span style={{fontSize:13, color:COL.inkSoft, fontWeight:400, letterSpacing:'.05em'}}>その仕組みを、60分でお伝えします。</span>
          </div>
        </div>
      </WSection>

      {/* CURRICULUM */}
      <WSection heading="セミナーで学べること" pt={32} pb={32}>
        {[
          ['01','なぜジョージアなのか','日本では知られていない、いま注目される理由'],
          ['02','年利10%がつく理由とは','預けるだけで増える仕組みを、図でやさしく解説'],
          ['03','失敗しない銀行口座開設とは','つまずきやすいポイントと、安全な進め方'],
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
      </WSection>

      {/* PROOF */}
      <WSection heading="選ばれている理由" pt={28} pb={32}>
        <WStatsBanner/>
        <div style={{textAlign:'center', fontSize:12, color:COL.inkSoft, marginTop:22, lineHeight:1.8}}>
          法人・個人合わせ、これまでに多くの方の<br/>口座開設をサポートしてきました。
        </div>
      </WSection>

      {/* INSTRUCTOR */}
      <WSection heading="セミナー講師紹介" pt={32} pb={32} bg={COL.surface2}>
        <div style={{display:'flex', gap:20, alignItems:'flex-start'}}>
          <div style={{
            width:120, height:148, flexShrink:0, position:'relative', overflow:'hidden',
            background:'linear-gradient(135deg,#c8b89b,#8a795e)',
          }}>
            <div style={{
              position:'absolute', inset:0,
              backgroundImage:'url("assets/instructor-seto.png")',
              backgroundSize:'cover',
              backgroundPosition:'50% 25%',
              filter:'saturate(.95) contrast(1.03)',
            }}/>
            <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 70%, rgba(0,0,0,.18))'}}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:11, color:'var(--accent)', letterSpacing:'.15em', marginBottom:6}}>SUBARU SETO</div>
            <div style={{fontSize:18, fontWeight:600, marginBottom:12, letterSpacing:'.04em'}}>瀬戸 統晴</div>
            <div style={{fontSize:13, color:COL.ink, lineHeight:1.95}}>ノマドという働き方に憧れてジョージアに渡航。<br/>現地の暮らしやすさに惹かれ、多くの人にその魅力を知ってほしいという想いでDot.10の事業に参画。</div>
          </div>
        </div>
      </WSection>

      {/* VOICES */}
      <WSection heading="お客様の声" pt={32} pb={32}>
        <WVoice
          photo="assets/voice-2.png"
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
          photo="assets/voice-3.png"
          meta="広島県・38歳・男性｜個人投資家"
          text={`無事に定期預金までできました!
利息が本当に良いですね(笑)日本の銀行だと『預けているだけで減っていく感覚』がありますが、こちらでは預けた瞬間から“増えていく”実感があります。
今は少額ですが、徐々に割り当てを増やしていく予定です。海外資産ってこんなに身近なんだと感じました。`}
        />
        <WVoice
          photo="assets/voice-1.png"
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
        <WCta big sub={<span style={{color:COL.inkSoft, fontSize:12, letterSpacing:'.04em'}}>最新情報／セミナー日程はLINEで公開中</span>}/>
      </WSection>

      {/* FAQ */}
      <WSection heading="よくあるご質問" pt={14} pb={36}>
        <WFaq
          q="英語やジョージア語が話せなくても大丈夫ですか？"
          a={<>問題ありません。全サービスは日本語でご案内可能です。<br/>現地サポートもついており、言語に不安がある方でも安心してご利用いただけます。</>}
        />
        <WFaq
          q="ビザは必要ですか？"
          a={<>日本国籍の方は、ジョージアに1年間ビザ不要で滞在できます。<br/>法人設立や長期滞在にあたって、必要に応じて最適なビザアドバイスも行っております。</>}
        />
        <WFaq
          q="法人設立と個人事業主、どちらが自分に向いていますか？"
          a={<>ビジネス規模や目的によって異なります。<br/>相談時にヒアリングを行い、最適な形をご提案いたします。</>}
        />
      </WSection>

      {/* FINAL CTA */}
      <WSection pt={36} pb={48} bg={COL.redIni}>
        <div style={{color:'#fff', textAlign:'center'}}>
          <div style={{fontSize:11, color:'#fff', letterSpacing:'.25em', marginBottom:14}}>JOIN US</div>
          <div style={{fontSize:24, fontWeight:600, marginBottom:24, lineHeight:1.55, letterSpacing:'.05em'}}>
            まずは公式LINEへ。
          </div>
          <WCta big sub={<span style={{color:'#fff',opacity:.9, fontSize:12, letterSpacing:'.04em'}}>最新情報／セミナー日程はLINEで公開中</span>}/>
        </div>
      </WSection>
    </WPage>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<LP/>);

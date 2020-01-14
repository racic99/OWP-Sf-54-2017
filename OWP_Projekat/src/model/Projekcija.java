package model;

public class Projekcija {

	private int id;
	private int film;
	private int tip;
	private int sala;
	private String datumVreme;
	private int cenaKarte;
	private String administrator;
	private boolean aktivan;
	
	public Projekcija() {
		this.aktivan=true;
	}

	public Projekcija(int id, int film, int tip, int sala, String datumVreme, int cenaKarte, String administrator,
			boolean aktivan) {
		super();
		this.id = id;
		this.film = film;
		this.tip = tip;
		this.sala = sala;
		this.datumVreme = datumVreme;
		this.cenaKarte = cenaKarte;
		this.administrator = administrator;
		this.aktivan = aktivan;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getFilm() {
		return film;
	}

	public void setFilm(int film) {
		this.film = film;
	}

	public int getTip() {
		return tip;
	}

	public void setTip(int tip) {
		this.tip = tip;
	}

	public int getSala() {
		return sala;
	}

	public void setSala(int sala) {
		this.sala = sala;
	}

	public String getDatumVreme() {
		return datumVreme;
	}

	public void setDatumVreme(String datumVreme) {
		this.datumVreme = datumVreme;
	}

	public int getCenaKarte() {
		return cenaKarte;
	}

	public void setCenaKarte(int cenaKarte) {
		this.cenaKarte = cenaKarte;
	}

	public String getAdministrator() {
		return administrator;
	}

	public void setAdministrator(String administrator) {
		this.administrator = administrator;
	}

	public boolean isAktivan() {
		return aktivan;
	}

	public void setAktivan(boolean aktivan) {
		this.aktivan = aktivan;
	}
	
	
	
}
